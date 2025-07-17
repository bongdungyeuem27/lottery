"use client"

import type {
  CenterProps,
  HoverCardContentProps,
  HoverCardRootProps,
} from "@chakra-ui/react"
import { HoverCard, Portal, Stack } from "@chakra-ui/react"
import { Fragment, type ReactNode, memo } from "react"

type Props = {
  children?: ReactNode
  label: ReactNode
  isDisabled?: boolean
  placement?: Truthy<HoverCardRootProps["positioning"]>["placement"]
  contentProps?: HoverCardContentProps
  rootProps?: Partial<HoverCardRootProps>
  isPortal?: boolean
} & CenterProps

const TooltipV2 = ({
  children,
  label,
  placement,
  isDisabled,
  contentProps,
  rootProps,
  isPortal,
  ...props
}: Props) => {
  const PP = isPortal ? Portal : Fragment
  return (
    // <Center position="relative" {...props}>
    <HoverCard.Root
      // unstyled
      // trigger="hover"
      lazyMount
      unmountOnExit
      openDelay={20}
      closeDelay={70}
      // portalled
      // present

      // computePositionOnMount={false}
      open={isDisabled ? false : undefined}
      // closeOnBlur={true}
      // closeOnEscape
      // closeOnInteractOutside

      // strategy="absolute"
      // preventOverflow
      // offset={[8, 8]}
      // boundary={document.body}
      {...rootProps}
      positioning={{
        gutter: 8,
        overflowPadding: 8,
        hideWhenDetached: true,
        strategy: "absolute",
        placement: placement || "bottom",
        ...(rootProps?.positioning || {}),
      }}
    >
      <HoverCard.Trigger asChild>{children}</HoverCard.Trigger>

      <PP>
        <HoverCard.Positioner>
          <HoverCard.Content
            // position="absolute"
            padding={1}
            zIndex={900}
            width="max-content"
            maxWidth="100vw"
            css={{
              "&[data-placement='top']": {
                bottom: "calc(100% + 0.5rem)",
              },
              "&[data-placement='bottom']": {
                top: "calc(100% + 0.5rem)",
              },
            }}
            {...contentProps}
          >
            <HoverCard.Arrow />
            <Stack
              padding="0.375rem"
              textStyle="8125"
              color="neutral.1"
              userSelect="none"
              textAlign="center"
              whiteSpace="pre-line"
            >
              {label}
            </Stack>
          </HoverCard.Content>
        </HoverCard.Positioner>
      </PP>
    </HoverCard.Root>
    // </Center>
  )
}

export type TooltipV2Props = Partial<Omit<Props, "ref">>

export default memo(TooltipV2)
