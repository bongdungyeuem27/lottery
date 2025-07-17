import { Heading, Text, VStack } from "@chakra-ui/react"
import IconSVGServer from "components/server/icon/IconSVG.server"
import ForbiddenSVG from "public/icons/403.svg"
import { memo } from "react"

type Props = {}

const Page = ({}: Props) => {
  return (
    <VStack
      flex={1}
      justifyContent="center"
      width="full"
      paddingX="1rem"
      paddingY="5rem"
    >
      <VStack gap="2.5rem" maxWidth="full" overflow="hidden">
        <IconSVGServer
          data={ForbiddenSVG}
          width="38rem"
          color="foreground"
          maxWidth="calc(100% - 2rem)"
        />
        <VStack width="38rem" gap="1.62rem" overflow="hidden" maxWidth="full">
          <Heading textStyle="28125" whiteSpace="pre-line">
            Access Restricted
          </Heading>
          <Text textStyle="1" textAlign="center" whiteSpace="pre-line">
            It seems like you're trying to access this website from the United
            States. Due to certain restrictions, we are unable to provide access
            to users in your region. We apologize for any inconvenience caused.
          </Text>
        </VStack>
      </VStack>
    </VStack>
  )
}

export default memo(Page, () => true)
