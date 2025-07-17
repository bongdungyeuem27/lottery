import type { ToasterProps } from "@chakra-ui/react"
import {
  ToastCloseTrigger,
  ToastDescription,
  ToastRoot,
  ToastTitle,
} from "@chakra-ui/react"
import CloseSVG from "public/icons/close.svg"
import IconSVGServer from "../icon/IconSVG.server"

const ToastServer = ({
  title,
  description,
  id,
}: Parameters<ToasterProps["children"]>[0]) => {
  return (
    <ToastRoot key={id} color="neutral.1">
      <ToastTitle>{title}</ToastTitle>
      {description && <ToastDescription>{description}</ToastDescription>}
      <ToastCloseTrigger>
        <IconSVGServer data={CloseSVG} boxSize="full" />
      </ToastCloseTrigger>
    </ToastRoot>
  )
}

export default ToastServer
