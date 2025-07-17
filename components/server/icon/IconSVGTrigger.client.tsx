"use client"

import { memo, use } from "react"

type Props = {
  promise: Promise<any> | null | undefined
}
const pm = Promise.resolve()
const IconSVGTrigger = ({ promise }: Props) => {
  use(promise || pm)
  return <></>
}

export default memo(
  IconSVGTrigger,
  (prev, next) => prev.promise === next.promise,
)
