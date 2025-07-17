import type { StackProps } from "@chakra-ui/react"
import { HStack } from "@chakra-ui/react"
import Logo from "components/server/logo/Logo.server"
import { memo } from "react"
import LinkInternal from "../../client/link/LinkInternal.client"

type Props = {} & StackProps

const LogoLink = (props: Props) => {
  return (
    <LinkInternal href="/" asChild>
      <HStack zIndex={1} gap={6} {...props}>
        <Logo />
      </HStack>
    </LinkInternal>
  )
}

export default memo(LogoLink, () => true)
