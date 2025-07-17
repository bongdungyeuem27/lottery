"use client"

import type { DotLottieReactProps } from "@lottiefiles/dotlottie-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { memo } from "react"

type Props = { data: DotLottieReactProps["data"] } & Omit<
  DotLottieReactProps,
  "data"
>

const AnimatedLottieConsumer = ({ data }: Props) => {
  return (
    <DotLottieReact
      data={data}
      loop
      autoplay
      renderConfig={{
        freezeOnOffscreen: true,
        autoResize: false,
      }}
    />
  )
}

export default memo(AnimatedLottieConsumer, (prev, next) => {
  return prev.data === next.data
})
