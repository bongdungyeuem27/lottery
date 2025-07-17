"use client"

import type { BoxProps } from "@chakra-ui/react"
import type { IconSVGProps } from "components/server/icon/IconSVG.server"
import IconSVG from "components/server/icon/IconSVG.server"
import { debounce } from "lodash"
import CopySVG from "public/icons/copy.svg"
import type React from "react"
import { memo, useCallback, useState } from "react"
import { proxy } from "valtio"
import TooltipV2 from "../tooltip/TooltipV2.client"

export type Props = {
  loading?: boolean
  color?: BoxProps["color"]
  defaultValue?: string
  setValue?: (event: React.MouseEvent) => Promise<any> | any
  isDisabled?: boolean
} & Partial<IconSVGProps>

const copyToClipboard = async (text: string) => {
  try {
    await navigator?.clipboard?.writeText?.(text)
  } catch (err) {
    console.log("Failed to copy: ", err)
  }
}

const CopyAsync = ({
  loading,
  defaultValue,
  setValue,
  onClick,
  isDisabled,
  ...props
}: Props) => {
  const [isWaiting, setIsWaiting] = useState(false)
  const [isCopied, setIsCopied] = useState(false)
  const [store] = useState(
    proxy<{ value: string; cached: AnyFunction | null }>({
      value: defaultValue || "",
      cached: null,
    }),
  )

  const handleRebounce = useCallback(
    debounce(() => setIsCopied(false), 3000),
    [],
  )

  const handleCopied = useCallback(() => {
    setIsCopied(true)
    handleRebounce()
  }, [])

  const handleClick = useCallback(
    async (e: React.MouseEvent, onClick: any, setValue: any) => {
      onClick?.(e)
      if (store.cached && store.cached === setValue) {
        await copyToClipboard(store.value).catch(console.log)
        handleCopied()
        return
      }

      store.cached = setValue

      let pmOrValue = setValue?.(e)

      if (pmOrValue instanceof Promise) {
        setIsWaiting(true)
        pmOrValue = await pmOrValue.catch((error) => {
          console.log(error)
          return ""
        })
      }

      const value = String(pmOrValue || "")

      store.value = value

      await copyToClipboard(value).catch(console.log)
      handleCopied()
      setIsWaiting(false)
    },
    [],
  )

  return (
    <TooltipV2
      placement="top"
      label={isCopied ? "Đã sao chép" : "Sao chép"}
      isDisabled={isDisabled || loading || isWaiting}
    >
      <IconSVG
        cursor="pointer"
        data={CopySVG}
        color="neutral.1"
        _hover={{
          color: "accent.blue",
        }}
        transition="all 0.2s ease-in-out"
        boxSize={5}
        display="inline-block"
        flexShrink={0}
        onClick={(e) => handleClick(e, onClick, setValue)}
        borderRadius={0}
        loading={loading || isWaiting}
        {...props}
      />
    </TooltipV2>
  )
}

export type CopyAsyncProps = Partial<Props>

export default memo(CopyAsync, (prev, next) => {
  return (
    prev.loading === next.loading &&
    prev.setValue === next.setValue &&
    prev.onClick === next.onClick &&
    prev.isDisabled === next.isDisabled &&
    prev.defaultValue === next.defaultValue
  )
})
