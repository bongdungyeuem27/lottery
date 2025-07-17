"use client"

import type { ButtonProps } from "@chakra-ui/react"
import { Button, Center } from "@chakra-ui/react"
import IconSVGServer, {
  type IconSVGProps,
} from "components/server/icon/IconSVG.server"
import BurgerSVG from "public/icons/burger.svg"
import CloseSVG from "public/icons/close.svg"
import type { ForwardedRef } from "react"
import { memo } from "react"

type Props = {
  isOpen: boolean | undefined
  iconProps?: IconSVGProps
  ref?: ForwardedRef<HTMLButtonElement>
} & Partial<ButtonProps>

const ActionToggle = ({ isOpen, onClick, iconProps, ref, ...props }: Props) => {
  return (
    <Button
      order={4}
      as={Center}
      borderRadius="100%"
      backgroundColor="neutral.2"
      onClick={onClick}
      display="flex"
      height="2.25rem"
      width="2.25rem"
      cursor="pointer"
      {...props}
      ref={ref}
    >
      <IconSVGServer
        data={isOpen ? CloseSVG : BurgerSVG}
        boxSize={4}
        color="neutral.7"
        {...iconProps}
      />
    </Button>
  )
}

export default memo(ActionToggle)
