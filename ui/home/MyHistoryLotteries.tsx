"use client"

import { Badge, HStack, Skeleton, Stack, Table } from "@chakra-ui/react"
import AsyncModal from "components/client/modal/AsyncModal.client"
import TextSkeleton from "components/client/skeleton/TextSkeleton"
import ScrollTable from "components/client/table/ScrollTable"
import moment from "moment"
import { memo, useState } from "react"
import { multipleRef } from "utils/dom"
import { generateKey } from "utils/key"
import { useAccount, useReadContract } from "wagmi"
import { abi, contract } from "./abi"

export type MyHistoryLotteriesState = {
  onOpen: (roundId: bigint) => Promise<void>
  onClose: () => void
}

type Props = {
  ref: React.ForwardedRef<MyHistoryLotteriesState>
}

// struct Ticket {
//   uint16 prediction; // 0-999
//   address buyer;
//   string fullName;
//   bytes32 idHash; // keccak256(ID)
//   uint256 blockNumber;
//   uint256 timestamp;
// }

const MyHistoryLotteries = ({ ref }: Props) => {
  const [roundId, setRoundId] = useState<bigint>(0n)
  const account = useAccount()
  const {
    data: currentTickets,
    isFetching: currentTicketsFetching,
    refetch: currentTicketsRefetch,
  } = useReadContract({
    address: contract,
    abi: abi,
    account: account.address!,
    functionName: "getUserTickets",
    args: [roundId],
    query: {
      enabled: roundId >= 0n,
      staleTime: 0,
    },
  })

  console.log(currentTickets)

  const {
    data: recentTickets,
    isFetching: recentTicketsFetching,
    refetch: recentTicketsRefetch,
  } = useReadContract({
    address: contract,
    abi: abi,
    account: account.address!,
    functionName: "getUserTickets",
    args: [roundId - 1n],
    query: {
      enabled: !!roundId,
      staleTime: 0,
    },
  })

  const { data: recentRound, isFetching: recentRoundFetching } =
    useReadContract({
      address: contract,
      abi: abi,
      functionName: "getRoundInfo",
      args: [roundId - 1n],
      query: {
        enabled: Boolean(roundId),
      },
    })

  return (
    <AsyncModal
      hasCloseButton
      ref={(e) =>
        multipleRef(
          {
            ...e!,
            onOpen: async (roundId: bigint) => {
              setRoundId(roundId)
              currentTicketsRefetch()
              return await e!.onOpen()
            },
          },
          ref!,
        )
      }
      title="Vé của tôi"
    >
      <Stack>
        <TextSkeleton loading={recentRoundFetching} truncate>
          Vòng này
        </TextSkeleton>
        <ScrollTable sizes={[25, 25, 25, 25]}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Số dự đoán</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">
                Họ và tên
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">
                Thời gian
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Số khối</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentTickets?.map((item, index) => (
              <Table.Row
                alignItems="top"
                key={generateKey(
                  index,
                  currentTicketsFetching,
                  item.blockNumber,
                  item.prediction,
                  index,
                )}
              >
                <Table.Cell>
                  <TextSkeleton loading={currentTicketsFetching} truncate>
                    {item.prediction}
                  </TextSkeleton>
                </Table.Cell>

                <Table.Cell>
                  <TextSkeleton loading={currentTicketsFetching} truncate>
                    {item.fullName}
                  </TextSkeleton>
                </Table.Cell>

                <Table.Cell>
                  <TextSkeleton
                    loading={currentTicketsFetching}
                    truncate
                    float="right"
                  >
                    {item.blockNumber}
                  </TextSkeleton>
                </Table.Cell>

                <Table.Cell>
                  <TextSkeleton
                    loading={currentTicketsFetching}
                    truncate
                    float="right"
                  >
                    {item.timestamp}
                  </TextSkeleton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </ScrollTable>
      </Stack>
      <Stack>
        <HStack>
          <TextSkeleton loading={recentRoundFetching} truncate>
            Kết quả vòng trước
          </TextSkeleton>
        </HStack>
        <ScrollTable sizes={[25, 25, 25, 25]}>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Số dự đoán</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">
                Họ và tên
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">
                Thời gian
              </Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Số khối</Table.ColumnHeader>
              <Table.ColumnHeader textAlign="right">Kết quả</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {recentTickets?.map((item, index) => (
              <Table.Row
                alignItems="top"
                key={generateKey(
                  index,
                  recentTicketsFetching,
                  item.blockNumber,
                  item.prediction,
                  index,
                )}
              >
                <Table.Cell>
                  <TextSkeleton loading={recentTicketsFetching} truncate>
                    {item.prediction}
                  </TextSkeleton>
                </Table.Cell>

                <Table.Cell>
                  <TextSkeleton loading={recentTicketsFetching} truncate>
                    {item.fullName}
                  </TextSkeleton>
                </Table.Cell>

                <Table.Cell>
                  <TextSkeleton
                    loading={recentTicketsFetching}
                    truncate
                    float="right"
                  >
                    {item.blockNumber}
                  </TextSkeleton>
                </Table.Cell>

                <Table.Cell>
                  <TextSkeleton
                    loading={recentTicketsFetching}
                    truncate
                    float="right"
                  >
                    {moment(Number(item.timestamp) * 1000).format(
                      "DD/MM/YYYY HH:mm:ss",
                    )}
                  </TextSkeleton>
                </Table.Cell>
                <Table.Cell>
                  <Skeleton
                    loading={recentTicketsFetching || recentRoundFetching}
                  >
                    <Badge
                      truncate
                      float="right"
                      colorPalette={
                        recentRound?.[2] === item.prediction ? "green" : "red"
                      }
                    >
                      {recentRound?.[2] === item.prediction ? "Trúng" : "Trượt"}
                    </Badge>
                  </Skeleton>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </ScrollTable>
      </Stack>
    </AsyncModal>
  )
}

export default memo(MyHistoryLotteries)
