import IconSVG, {
  type IconSVGProps,
} from "components/server/icon/IconSVG.server"
import LogoFullSVG from "public/logo-full.svg"
import { memo } from "react"

type Props = {} & IconSVGProps

const Logo = (props: Props) => {
  return <IconSVG data={LogoFullSVG} width="8rem" color="brand" {...props} />
}

export default memo(Logo)
