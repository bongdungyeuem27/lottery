import type { CenterProps, FlexProps } from "@chakra-ui/react"
import { Center, Flex } from "@chakra-ui/react"
import type React from "react"
import type { ReactNode, RefObject } from "react"
import { memo } from "react"
import DataFetchAlert from "./DataFetchAlert"
import type { EmptyProps } from "./Empty"
import Empty from "./Empty"
import Loading from "./Loading"

type Props = Partial<Omit<FlexProps, "content">> & {
  isError?: boolean
  emptyText?: ReactNode
  actionBar?: React.ReactNode
  isEmpty?: any
  loading?: boolean | any
  placeholder?: ReactNode
  emptyProps?: EmptyProps
  loadingProps?: CenterProps
  ref?: RefObject<HTMLDivElement>
}

const DataListDisplay = ({
  isError,
  loadingProps,
  actionBar,
  children,
  isEmpty,
  loading,
  emptyText,
  placeholder,
  emptyProps,
  ...props
}: Props) => {
  return (
    <Flex
      flexDirection="column"
      width="full"
      height="full"
      flex={1}
      gap={3}
      {...props}
    >
      {actionBar}
      {loading ? (
        placeholder || (
          <Center
            width="full"
            height="full"
            minHeight="30.75rem"
            flex={1}
            {...loadingProps}
          >
            <Loading boxSize="3rem" />
          </Center>
        )
      ) : isError ? (
        <DataFetchAlert />
      ) : isEmpty ? (
        <Empty text={emptyText} height="30.75rem" {...emptyProps} />
      ) : (
        children
      )}
    </Flex>
  )
}

export default memo(DataListDisplay)
