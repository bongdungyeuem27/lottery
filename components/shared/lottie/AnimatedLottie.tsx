import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import type { DotLottieReactProps } from "@lottiefiles/dotlottie-react"
import { memo } from "react"
import AnimatedLottieConsumer from "./AnimatedLottieConsumer"

type Props = {
  data: DotLottieReactProps["data"]
} & BoxProps

const AnimatedLottie = ({ data, ...props }: Props) => {
  return (
    <Box
      boxSize="3rem"
      whiteSpace="nowrap"
      flexShrink={0}
      color="primary"
      overflow="visible"
      {...props}
    >
      <AnimatedLottieConsumer data={data} />
    </Box>
  )
}

export default memo(AnimatedLottie)
