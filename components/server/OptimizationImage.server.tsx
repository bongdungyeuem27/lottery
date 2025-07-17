import type { BoxProps } from "@chakra-ui/react"
import { Box } from "@chakra-ui/react"
import type { ImageProps as NextImageProps } from "next/image"
import NextImage from "next/image"
import { type CSSProperties, memo } from "react"

type Props = {
  objectFit?: CSSProperties["objectFit"]
  imageStyle?: CSSProperties
} & Omit<BoxProps, "objectFit"> &
  Pick<NextImageProps, "src" | "alt">

const OptimizationImage = ({
  src,
  alt,
  objectFit = "cover",
  imageStyle,
  ...props
}: Props) => {
  return (
    <Box position="relative" {...props}>
      <NextImage
        src={src}
        alt={alt}
        fill
        style={{
          ...imageStyle,
          objectFit: objectFit,
        }}
      />
    </Box>
  )
}

export default memo(OptimizationImage)
