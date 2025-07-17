import IconSVGServer, {
  type IconSVGProps,
} from "components/server/icon/IconSVG.server"
import LoadingSVG from "public/icons/loading.svg"
import { memo } from "react"

type Props = {
  //
} & Partial<IconSVGProps>

const Loading = (props: Props) => {
  return (
    <IconSVGServer
      data={LoadingSVG}
      color="primary.light.4"
      animation="spin 2s linear infinite"
      boxSize={6}
      {...props}
    />
  )
}

export default memo(Loading)
