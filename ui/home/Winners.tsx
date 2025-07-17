"use client"

import { Stack, type StackProps, Table, Text } from "@chakra-ui/react"
import TextSkeleton from "components/client/skeleton/TextSkeleton"
import ScrollTable from "components/client/table/ScrollTable"
import { memo } from "react"
import { generateKey } from "utils/key"
import { useReadContract } from "wagmi"
import { abi, contract } from "./abi"

type Props = {
  roundId: bigint | undefined
} & StackProps

const Winners = ({ roundId, ...props }: Props) => {
  const { data, isFetching } = useReadContract({
    address: contract,
    abi: abi,
    functionName: "getWinningTickets",
    args: [(roundId ?? 0n) - 1n],
    query: {
      enabled: Boolean(roundId),
    },
  })

  return (
    <Stack {...props}>
      <Text color="neutral.1">Kết quả</Text>
      <ScrollTable
        minHeight="20rem"
        backgroundColor="neutral.1"
        sizes={[25, 25, 25, 25]}
      >
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Số dự đoán</Table.ColumnHeader>
            <Table.ColumnHeader>Địa chỉ ví</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Họ và tên</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Thời gian</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="right">Số khối</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data?.map((item, index) => (
            <Table.Row
              alignItems="top"
              key={generateKey(
                index,
                isFetching,
                item.blockNumber,
                item.prediction,
                index,
              )}
            >
              <Table.Cell>
                <TextSkeleton loading={isFetching} truncate>
                  {item.prediction}
                </TextSkeleton>
              </Table.Cell>

              <Table.Cell>
                <TextSkeleton loading={isFetching} truncate>
                  {item.buyer}
                </TextSkeleton>
              </Table.Cell>

              <Table.Cell>
                <TextSkeleton loading={isFetching} truncate>
                  {item.fullName}
                </TextSkeleton>
              </Table.Cell>

              <Table.Cell>
                <TextSkeleton loading={isFetching} truncate float="right">
                  {item.blockNumber}
                </TextSkeleton>
              </Table.Cell>

              <Table.Cell>
                <TextSkeleton loading={isFetching} truncate float="right">
                  {item.timestamp}
                </TextSkeleton>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </ScrollTable>
    </Stack>
  )
}

export default memo(Winners)
