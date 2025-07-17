// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

contract DailyThreeDigitLottery is Ownable {
    /* ──────────────────── Constants ──────────────────── */
    uint256 public constant TICKET_PRICE = 0.02 ether; // 10 ETH / ticket
    uint256 public constant PRIZE_SHARE = 0.01 ether; // 5 ETH → prize pool
    uint256 public constant NATION_SHARE = 0.01 ether; // 5 ETH → nation fund

    /* ──────────────────── Data Models ──────────────────── */
    struct Ticket {
        uint16 prediction; // 0-999
        address buyer;
        string fullName;
        bytes32 idHash; // keccak256(ID)
        uint256 blockNumber;
        uint256 timestamp;
    }

    struct Round {
        uint256 startBlock;
        uint16 winningNumber; // set when drawn
        bool drawn;
        uint256 prizePool; // remaining, decreases as winners withdraw
        Ticket[] tickets;
        // —— New winner bookkeeping ——
        address[] winnerAddresses; // iterable list
        mapping(address => uint256) winnings; // amount owed
        mapping(address => bool) paid; // has withdrawn?
    }

    /* ──────────────────── Storage ──────────────────── */
    Round[] private rounds;

    uint256 public nationBuildingFundTotal; // cumulative 5 ETH per ticket
    uint256 public nationBuildingFundWithdrawn; // amount already withdrawn

    /* ──────────────────── Events ──────────────────── */
    event TicketPurchased(
        uint256 indexed roundId,
        uint256 indexed ticketId,
        address indexed buyer,
        uint16 prediction
    );
    event DrawExecuted(
        uint256 indexed roundId,
        uint16 winningNumber,
        uint256 winners,
        uint256 prizePerTicket
    );
    event PrizeWithdrawn(
        uint256 indexed roundId,
        address indexed winner,
        uint256 amount
    );
    event NationFundWithdrawn(address indexed to, uint256 amount);

    /* ──────────────────── Constructor ──────────────────── */
    constructor() Ownable(msg.sender) {
        rounds.push();
        rounds[0].startBlock = block.number;
    }

    /* ──────────────────── Ticket API ──────────────────── */
    function buyTicket(
        uint16 prediction,
        string calldata fullName,
        string calldata idNumber
    ) external payable {
        require(msg.value == TICKET_PRICE, "Ticket costs 10 ETH");
        require(prediction < 1000, "Prediction must be 0-999");

        Round storage r = rounds[rounds.length - 1];
        r.tickets.push(
            Ticket({
                prediction: prediction,
                buyer: msg.sender,
                fullName: fullName,
                idHash: keccak256(bytes(idNumber)),
                blockNumber: block.number,
                timestamp: block.timestamp
            })
        );

        r.prizePool += PRIZE_SHARE;
        nationBuildingFundTotal += NATION_SHARE;

        emit TicketPurchased(
            rounds.length - 1,
            r.tickets.length - 1,
            msg.sender,
            prediction
        );
    }

    /* ──────────────────── Draw & Reset ──────────────────── */
    function drawAndReset() external onlyOwner {
        Round storage r = rounds[rounds.length - 1];
        require(!r.drawn, "Current round already drawn");

        // 1️⃣  Generate three-digit pseudo-random number (demo only)
        uint16 winning = 111;
        r.winningNumber = winning;
        r.drawn = true;

        // 2️⃣  Tally winners (unique addresses & ticket counts)
        mapping(address => uint256) storage winAmt = r.winnings; // alias
        uint256 totalWinningTickets;
        for (uint256 i = 0; i < r.tickets.length; ++i) {
            Ticket storage t = r.tickets[i];
            if (t.prediction == winning) {
                if (winAmt[t.buyer] == 0) {
                    // first time this address appears → store for iteration
                    r.winnerAddresses.push(t.buyer);
                }
                winAmt[t.buyer] += 1; // count winning tickets
                totalWinningTickets += 1;
            }
        }

        uint256 prizePerTicket = 0;
        if (totalWinningTickets > 0) {
            prizePerTicket = r.prizePool / totalWinningTickets;

            // compute final amount per address (tickets × prizePerTicket)
            for (uint256 j = 0; j < r.winnerAddresses.length; ++j) {
                address w = r.winnerAddresses[j];
                winAmt[w] = winAmt[w] * prizePerTicket; // overwrite count with ETH amount
            }
            // prizePool stays as is; decreases only when winners withdraw
        }

        emit DrawExecuted(
            rounds.length - 1,
            winning,
            r.winnerAddresses.length,
            prizePerTicket
        );

        // 3️⃣  Start new round
        rounds.push();
        rounds[rounds.length - 1].startBlock = block.number;
    }

    /* ──────────────────── Winner Withdraw ──────────────────── */
    function withdrawPrize(uint256 roundId) external {
        require(roundId < rounds.length, "Round does not exist");
        Round storage r = rounds[roundId];
        require(r.drawn, "Round not drawn yet");
        uint256 amount = r.winnings[msg.sender];
        require(amount > 0, "No prize for caller");
        require(!r.paid[msg.sender], "Prize already withdrawn");

        r.paid[msg.sender] = true;
        r.prizePool -= amount; // track remaining pool
        r.winnings[msg.sender] = 0; // prevent re-entrancy

        payable(msg.sender).transfer(amount);
        emit PrizeWithdrawn(roundId, msg.sender, amount);
    }

    /* ──────────────────── View Helpers ──────────────────── */
    function currentRound() external view returns (uint256) {
        return rounds.length - 1;
    }

    function getRoundInfo(uint256 roundId)
        external
        view
        returns (
            uint256 startBlock,
            bool drawn,
            uint16 winningNumber,
            uint256 prizePool,
            uint256 ticketCount,
            uint256 winnerCount
        )
    {
        Round storage r = rounds[roundId];
        return (
            r.startBlock,
            r.drawn,
            r.winningNumber,
            r.prizePool,
            r.tickets.length,
            r.winnerAddresses.length
        );
    }

    function getTicket(uint256 roundId, uint256 ticketId)
        external
        view
        returns (
            uint16 prediction,
            address buyer,
            string memory fullName,
            bytes32 idHash,
            uint256 blockNumber,
            uint256 timestamp
        )
    {
        Ticket storage t = rounds[roundId].tickets[ticketId];
        return (
            t.prediction,
            t.buyer,
            t.fullName,
            t.idHash,
            t.blockNumber,
            t.timestamp
        );
    }

    function winnerAmount(uint256 roundId, address winner)
        external
        view
        returns (uint256 amount, bool paid)
    {
        Round storage r = rounds[roundId];
        return (r.winnings[winner], r.paid[winner]);
    }

    /* ──────────────────── Nation Fund ──────────────────── */
    function nationFundAvailable() public view returns (uint256) {
        return nationBuildingFundTotal - nationBuildingFundWithdrawn;
    }

    function withdrawNationFund(address payable to, uint256 amount)
        external
        onlyOwner
    {
        require(amount <= nationFundAvailable(), "Insufficient nation fund");
        nationBuildingFundWithdrawn += amount;
        to.transfer(amount);
        emit NationFundWithdrawn(to, amount);
    }

    /**
     * @notice Return every ticket purchased by `user` in `roundId`.
     * @dev    Trả về mảng copy trong memory; không chạm vào storage gốc.
     */
    function getUserTickets(uint256 roundId)
        external
        view
        returns (Ticket[] memory)
    {
        require(roundId < rounds.length, "Round does not exist");
        Round storage r = rounds[roundId];

        // 1️⃣  Đếm trước để cấp phát đúng kích thước
        uint256 cnt;
        for (uint256 i = 0; i < r.tickets.length; ++i) {
            if (r.tickets[i].buyer == msg.sender) cnt++;
        }

        // 2️⃣  Sao chép các vé phù hợp vào mảng kết quả
        Ticket[] memory out = new Ticket[](cnt);
        uint256 idx;
        for (uint256 i = 0; i < r.tickets.length; ++i) {
            if (r.tickets[i].buyer == msg.sender) {
                out[idx++] = r.tickets[i];
            }
        }
        return out;
    }

    /**
     * @notice Return all winning tickets of `roundId`.
     * @dev    Reverts if the round has not been drawn yet.
     */
    function getWinningTickets(uint256 roundId)
        external
        view
        returns (Ticket[] memory)
    {
        require(roundId < rounds.length, "Round does not exist");
        Round storage r = rounds[roundId];
        require(r.drawn, "Round not drawn yet");

        // 1️⃣  Đếm vé trúng
        uint256 winners;
        for (uint256 i = 0; i < r.tickets.length; ++i) {
            if (r.tickets[i].prediction == r.winningNumber) winners++;
        }

        // 2️⃣  Tạo mảng kết quả
        Ticket[] memory out = new Ticket[](winners);
        uint256 idx;
        for (uint256 i = 0; i < r.tickets.length; ++i) {
            if (r.tickets[i].prediction == r.winningNumber) {
                out[idx++] = r.tickets[i];
            }
        }
        return out;
    }

    /**
     * @notice Emergency: withdraw every wei held by this contract.
     * @dev    Gọi chỉ khi chắc chắn đã hoàn thành mọi nghĩa vụ trả thưởng & nation-fund.
     */
    function emergencyWithdrawAll() external onlyOwner {
        uint256 amount = address(this).balance;
        require(amount > 0, "Contract balance is zero");
        payable(owner()).transfer(amount);
    }

    /* ──────────────────── Fallback ──────────────────── */
    receive() external payable {
        revert("Direct ETH not accepted");
    }
}
