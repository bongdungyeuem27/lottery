"use client"

import type { LinkProps } from "@chakra-ui/react"
import { Link as ChakraLink } from "@chakra-ui/react"
import NextLink, { type LinkProps as NextLinkProps } from "next/link"
import { memo } from "react"

type Props = Omit<LinkProps, "href" | "variant"> & {
  href: NextLinkProps["href"]
  variant?: "overlay" | "underline"
}

const LinkInternal = ({
  children,
  href,
  variant = "underline",
  ...props
}: Props) => {
  return (
    <ChakraLink
      color={variant === "underline" ? "accent.blue" : undefined}
      _hover={{
        textDecoration: variant === "overlay" ? "unset" : undefined,
      }}
      _focusVisible={
        variant === "overlay"
          ? {
              outline: "none",
            }
          : undefined
      }
      _focus={
        variant === "overlay"
          ? {
              outline: "none",
            }
          : undefined
      }
      asChild
      {...props}
    >
      <NextLink href={href}>{children}</NextLink>
    </ChakraLink>
  )
}

export type LinkInternalProps = Props

export default memo(LinkInternal)
