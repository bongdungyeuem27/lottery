import type { IconProps } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import LoadingSVG from "public/icons/loading.svg"
import { Suspense, memo } from "react"
import IconSVGTriggerClient from "./IconSVGTrigger.client"

type Props = {
  promise?: Promise<any> | null | undefined
  loading?: boolean
} & IconProps

const Loading = ({
  width = 6,
  height = 6,
  promise,
  loading,
  ...props
}: Props) => {
  return (
    <Suspense
      fallback={
        <Icon
          flexShrink={0}
          width={width}
          height={height}
          overflow="hidden"
          color="primary"
          animation="spin 2s linear infinite"
          {...props}
        >
          <LoadingSVG />
        </Icon>
      }
    >
      <IconSVGTriggerClient promise={promise} />
      <Icon
        data-loading={Boolean(loading) || undefined}
        flexShrink={0}
        width={width}
        height={height}
        overflow="hidden"
        color="primary"
        display="none"
        animation="spin 2s linear infinite"
        animationPlayState="paused"
        _loading={{
          display: "flex",
          animationPlayState: "running",
        }}
        {...props}
      >
        <LoadingSVG />
      </Icon>
    </Suspense>
  )
}

export default memo(Loading)
