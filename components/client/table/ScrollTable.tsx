"use client"

import type { BoxProps } from "@chakra-ui/react"
import { Table } from "@chakra-ui/react"
import { isNil, zipObject, zipWith } from "lodash"
import type React from "react"
import { type CSSProperties, memo, useMemo } from "react"
import { generateKey } from "utils/key"

type Props = {
  children: React.ReactNode
  boxProps?: Partial<BoxProps>
  sizes?: (`${number}%` | number)[]
  mins?: Exclude<CSSProperties["minWidth"], `${number}%`>[]
  maxs?: Exclude<CSSProperties["maxWidth"], `${number}%`>[]
} & Partial<Table.RootProps>

const ScrollTable = ({
  children,
  boxProps,
  sizes,
  mins,
  maxs,
  hidden,
  ...props
}: Props) => {
  const dimensions = useMemo(() => {
    const paddedSizes = (sizes || []).filter((x) => !isNil(x))
    const paddedMins = (mins || [])
      .concat(Array(paddedSizes?.length || 0).fill(undefined))
      .slice(0, paddedSizes?.length || 0)
    const paddedMaxs = (maxs || [])
      .concat(Array(paddedSizes?.length || 0).fill(undefined))
      .slice(0, paddedSizes?.length || 0)
    return (
      zipObject(
        paddedSizes.map((_, index) => `&:nth-of-type(${index + 1})`),
        zipWith(paddedMins || [], paddedMaxs || [], (min, max) => ({
          minWidth: min || "auto",
          maxWidth: max || "max-content",
        })),
      ) || {}
    )
  }, [mins, maxs])

  return (
    <Table.ScrollArea borderWidth={1} maxWidth="100%">
      <Table.Root
        showColumnBorder
        variant="outline"
        css={{
          tbody: {
            tr: {
              td: {
                whiteSpace: "nowrap",
                ...dimensions,
              },
            },
          },
        }}
        interactive
        backgroundColor="neutral.1"
        {...props}
      >
        {Boolean(sizes?.length) && (
          <Table.ColumnGroup>
            {sizes!.map((size, index) => {
              return (
                <Table.Column
                  key={generateKey(index, true, size, index)}
                  htmlWidth={String(size).endsWith("%") ? size : `${size}%`}
                />
              )
            })}
          </Table.ColumnGroup>
        )}
        {children}
      </Table.Root>
    </Table.ScrollArea>
  )
}

export default memo(ScrollTable, (prev, next) => {
  return (
    prev.sizes === next.sizes &&
    prev.children === next.children &&
    prev.mins === next.mins &&
    prev.maxs === next.maxs
  )
})
