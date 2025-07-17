import { ImageResponse } from "next/og"
import FaviconSVG from "public/favicon.svg"

// Image metadata
export const size = {
  width: 512,
  height: 512,
}

export const contentType = "image/png"

// Image generation
export default function Icon() {
  return new ImageResponse(
    // ImageResponse JSX element

    <FaviconSVG width="100%" height="100%" />,
    // ImageResponse options
    {
      // For convenience, we can re-use the exported icons size metadata
      // config to also set the ImageResponse's width and height.
      ...size,
    },
  )
}
