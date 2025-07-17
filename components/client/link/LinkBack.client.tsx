"use client"

import type { ButtonProps } from "@chakra-ui/react"
import { Button } from "@chakra-ui/react"
import IconSVG from "components/server/icon/IconSVG.server"
import type { LinkProps as NextLinkProps } from "next/link"
import BackSVG from "public/icons/back.svg"
import { memo } from "react"
import LinkInternal from "./LinkInternal.client"

type Props = Partial<ButtonProps> & {
  href: NextLinkProps["href"]
}
const LinkBack = ({ href, ...props }: Props) => {
  return (
    <Button
      as={LinkInternal}
      variant="blur-outline"
      width="max-content"
      size="xs"
      borderRadius="xl"
      boxShadow="sm"
      color="neutral.1"
      // @ts-ignore
      href={href}
      {...props}
    >
      <IconSVG data={BackSVG} boxSize={6} />
    </Button>
  )
}

export type LinkBackProps = Props

export default memo(LinkBack)
