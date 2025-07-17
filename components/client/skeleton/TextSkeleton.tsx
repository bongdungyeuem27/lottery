"use client"

import { Skeleton, type TextProps, chakra } from "@chakra-ui/react"
import { type ForwardedRef, type ReactNode, memo } from "react"

type Props = {
  children: ReactNode
  loading?: boolean
  ref?: ForwardedRef<HTMLSpanElement>
} & TextProps

const TextSkeleton = ({
  children,
  loading,
  whiteSpace,
  ref,
  ...props
}: Props) => {
  return (
    <Skeleton
      display="inline-flex"
      asChild
      whiteSpace={whiteSpace}
      loading={loading}
      {...props}
    >
      <chakra.span
        display="inline-flex"
        whiteSpace={whiteSpace}
        borderColor="neutral.4"
        _empty={{
          display: "none",
        }}
        alignItems="center"
        {...props}
        ref={ref}
      >
        {children}
      </chakra.span>
    </Skeleton>
  )
}

export default memo(TextSkeleton)
