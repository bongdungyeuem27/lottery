import IconSVGServer, {
  type IconSVGProps,
} from "components/server/icon/IconSVG.server"
import EastMiniSVG from "public/icons/arrows/east-mini.svg"
import { memo } from "react"

type Props = {
  isOpen: any
  data?: IconSVGComponent
  from?: number
  to?: number
} & Partial<IconSVGProps>

const ArrowToggle = ({ isOpen, from = -90, to = 90, ...props }: Props) => {
  return (
    <IconSVGServer
      data-state={isOpen ? "open" : "closed"}
      boxSize={4}
      transition="transform 0.3s linear"
      _open={{
        transform: `rotate(${to}deg)`,
      }}
      _closed={{
        transform: `rotate(${from}deg)`,
      }}
      data={EastMiniSVG}
      {...props}
    />
  )
}

export default memo(ArrowToggle)
