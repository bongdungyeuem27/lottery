import type { CenterProps, TextProps } from "@chakra-ui/react"
import { Center, Text } from "@chakra-ui/react"
import IconSVGServer from "components/server/icon/IconSVG.server"
import EmptySVG from "public/icons/empty.svg"
import { memo } from "react"
type Props = {
  text?: React.ReactNode
  boxSize?: CenterProps["boxSize"]
  textProps?: TextProps
} & Partial<CenterProps>

const Empty = ({ text, boxSize = "10rem", textProps, ...props }: Props) => {
  return (
    <Center flexDirection="column" flex={1} padding={4} {...props}>
      <IconSVGServer data={EmptySVG} boxSize={boxSize} />
      <Text textStyle="1" color="neutral.7" textAlign="center" {...textProps}>
        {text ?? "No data found"}
      </Text>
    </Center>
  )
}

export type EmptyProps = Props

export default memo(Empty)
