"use client"

import { Alert, Box, Button, Image, Stack, Text } from "@chakra-ui/react"
import BigNumber from "bignumber.js"
import type { AsyncModalState } from "components/client/modal/AsyncModal.client"
import { toaster } from "components/server/toast/toast.config"
import AnimatedLottie from "components/shared/lottie/AnimatedLottie"
import { useWallet } from "hooks/client/useWallet"
import cartJSON from "public/lotties/cart.json"
import { memo, useMemo, useRef } from "react"
import { LuTickets } from "react-icons/lu"
import { useReadContract, useWriteContract } from "wagmi"
import { abi, contract } from "./abi"
import BuyLottery from "./BuyLottery"
import MyHistoryLotteries, {
  type MyHistoryLotteriesState,
} from "./MyHistoryLotteries"
import Winners from "./Winners"

type Props = {}

const Home = ({}: Props) => {
  const historyLotteriesRef = useRef<MyHistoryLotteriesState>(null)
  const buyLotteryRef = useRef<AsyncModalState>(null)

  const { account, handleConnect } = useWallet()

  const { data: roundId, isFetching } = useReadContract({
    address: contract,
    abi: abi,
    functionName: "currentRound",
  })

  const recentRoundId = useMemo(() => (roundId ?? 0n) - 1n, [roundId])

  console.log("recentRoundId", recentRoundId)
  // [amount, claimed]
  const { data: winnerData, refetch: refetchWinnerData } = useReadContract({
    address: contract,
    abi: abi,
    account: account.address!,
    functionName: "winnerAmount",
    args: [recentRoundId, account.address!],
    query: {
      enabled: Boolean(roundId && account.isConnected && account.address),
      staleTime: 0,
    },
  })

  console.log("winnerData", winnerData)

  const { data: recentRound } = useReadContract({
    address: contract,
    abi: abi,
    functionName: "getRoundInfo",
    args: [recentRoundId],
    query: {
      enabled: Boolean(roundId),
    },
  })

  const { writeContractAsync, isPending: isWithdrawing } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toaster.success({
          title: "Nhận thưởng thành công",
        })
        refetchWinnerData()
      },
      onError: (error) => {
        console.log(error)
        toaster.error({
          title: "Nhận thưởng thất bại",
        })
      },
    },
  })

  console.log(account)

  return (
    <Stack gap={2} position="relative" maxW="1000px" width="100%" mx="auto">
      <MyHistoryLotteries ref={historyLotteriesRef} />
      <BuyLottery ref={buyLotteryRef} />
      <Image
        width="100%"
        aspectRatio={0.45}
        zIndex={-1}
        src="/images/home.png"
        alt="home"
      />
      <Button
        position="absolute"
        top="2rem"
        right="2rem"
        variant="subtle"
        size="lg"
        disabled={!account.isConnected}
        loading={isFetching}
        onClick={() => historyLotteriesRef.current?.onOpen(roundId!)}
      >
        Vé của tôi <LuTickets />
      </Button>

      <Button
        loading={account.isConnecting || account.isReconnecting}
        hidden={!!account.isConnected}
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        variant="subtle"
        size="xxxl"
        textStyle="175"
        colorScheme="mixed.orange"
        borderRadius={4}
        onClick={() => handleConnect()}
      >
        Kết nối ví
      </Button>
      <Button
        hidden={!account.isConnected}
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        variant="solid"
        colorPalette="orange"
        size="xxxl"
        textStyle="175"
        borderRadius={4}
        onClick={() => buyLotteryRef.current?.onOpen()}
      >
        <span>Mua vé</span>
        <Box
          position="relative"
          width={{
            base: 8,
            sm: 10,
          }}
          flexShrink={0}
        >
          <AnimatedLottie
            pointerEvents="none"
            left={0}
            top="50%"
            transform="translate(-0.75rem, -60%)"
            position="absolute"
            zIndex={2}
            data={cartJSON}
            boxSize="9rem"
            alignSelf="flex-end"
          />
        </Box>
      </Button>
      {recentRound && (
        <Alert.Root
          status="neutral"
          position="absolute"
          top="37%"
          left="50%"
          width="20rem"
          transform="translate(-50%, -50%)"
        >
          <Alert.Content textAlign="center">
            <Alert.Title textStyle="1125">Số trúng thưởng:</Alert.Title>
            <Alert.Description
              flexDirection="column"
              display="flex"
              alignItems="center"
              gap={2}
            >
              <Text textStyle="225">{recentRound[2]}</Text>
              <Text
                display="inline-flex"
                whiteSpace="nowrap"
                fontSize="2rem"
                lineHeight="1"
              >
                🎉🎉🎉
              </Text>
              {Boolean(winnerData?.[0] || winnerData?.[1]) && (
                <Button
                  disabled={winnerData?.[1]}
                  variant="solid"
                  colorPalette="blue"
                  size="lg"
                  textStyle="1125"
                  loading={isWithdrawing}
                  onClick={() =>
                    writeContractAsync({
                      address: contract,
                      abi: abi,
                      functionName: "withdrawPrize",
                      args: [recentRoundId],
                      account: account.address!,
                    })
                  }
                >
                  {winnerData?.[1]
                    ? "Đã nhận"
                    : `Nhận thưởng ${BigNumber(winnerData![0].toString())
                        .div(BigNumber(10).pow(18))
                        .toFormat()} SEI`}
                </Button>
              )}
            </Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}
      <Winners
        roundId={roundId}
        position="absolute"
        bottom="5rem"
        left="2rem"
        right="2rem"
      />
    </Stack>
  )
}

export default memo(Home)
