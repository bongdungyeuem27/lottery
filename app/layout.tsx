import { GoogleAnalytics } from "@next/third-parties/google"
import { isServer } from "@tanstack/react-query"
import { inter } from "configs/font"
import type { Metadata } from "next"
import { memo } from "react"
import { transformENV } from "scripts/transform-env"
import "utils/moment"
import Provider from "./provider"

export const runtime = "nodejs"

export const dynamic = "force-dynamic"

// export const experimental_ppr = true

export const metadata: Metadata = {
  title: "MayFest - Celebrate the Shining Moments",
  description:
    "MayFest is a ticketing platform for music performances, arts, entertainment events, and fan meetings, dedicated to the community of music and art lovers. We strive to connect you with the most shining moments — from world-class stages of sound and light to unforgettable emotional experiences with your favorite artists",
}

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  if (isServer && (!globalThis.privateENV || !globalThis.publicENV)) {
    const envs = transformENV()
    globalThis.publicENV = envs.publicENV
    globalThis.privateENV = envs.privateENV
  }

  if (typeof String.prototype.capitalize !== "function") {
    String.prototype.capitalize = function () {
      return this.charAt(0).toUpperCase() + this.slice(1)
    }
  }

  if (typeof String.prototype.capitalizeFirstLetter !== "function") {
    String.prototype.capitalizeFirstLetter = function () {
      return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase()
    }
  }

  return (
    <html
      className={`${inter.variable} dark`}
      lang="vi-VN"
      suppressHydrationWarning
    >
      <head />
      <body
        suppressHydrationWarning
        style={{
          minHeight: "100dvh",
          display: "flex",
          flexDirection: "column",
          scrollbarGutter: "stable",
          overflowY: "scroll",
        }}
      >
        <Provider publicENV={globalThis.publicENV}>{children}</Provider>

        <GoogleAnalytics
          gaId={`${globalThis.publicENV?.NEXT_PUBLIC_GTAG_ID}`}
        />
      </body>
    </html>
  )
}

export default memo(RootLayout, (prev, next) => {
  return prev.children === next.children
})
