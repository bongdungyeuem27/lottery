import type { BoxProps, ChakraComponent, IconProps } from "@chakra-ui/react"
import { Box, Skeleton } from "@chakra-ui/react"
import type { ElementType } from "react"
import { Suspense, memo } from "react"
import IconSVGTriggerClient from "./IconSVGTrigger.client"

type Props = {
  data: IconSVGComponent
  promise?: Promise<any> | null | undefined
  loading?: boolean
  fallbackComponent?: ChakraComponent<ElementType, IconProps>
} & BoxProps

const IconSVG = ({
  children,
  width,
  height,
  data: Data,
  promise,
  loading,
  fallbackComponent: FallbackComponent,
  ...props
}: Props) => {
  const Fallback = FallbackComponent || Skeleton
  return (
    <Suspense
      fallback={<Fallback width={width} height={height} {...(props as any)} />}
    >
      <IconSVGTriggerClient promise={promise} />
      <Box
        flexShrink={0}
        width={width}
        height={height}
        overflow="hidden"
        {...props}
      >
        {(loading && <Fallback width="full" height="full" />) ||
          (Data && <Data style={{ width: "100%", height: "100%" }} />) ||
          children}
      </Box>
    </Suspense>
  )
}

export type IconSVGProps = Partial<Props>

export default memo(
  IconSVG,
  (prev, next) =>
    prev.data === next.data &&
    prev.children === next.children &&
    prev.promise === next.promise &&
    prev.loading === next.loading &&
    prev.fallbackComponent === next.fallbackComponent,
)
