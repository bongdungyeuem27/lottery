"use client"

import { ChakraProvider, Toaster } from "@chakra-ui/react"
import { QueryClientProvider } from "@tanstack/react-query"
import ToastServer from "components/server/toast/Toast.server"
import { toaster } from "components/server/toast/toast.config"
import system from "configs/theme/theme"
import { useShallowMemo } from "hooks/client/useShallow"
import { getQueryClient } from "hooks/server/getQueryClient"
import { isEqual } from "lodash"
import { ThemeProvider } from "next-themes"
import AppKitProvider from "providers/appkit/AppKitProvider"
import { memo, type ReactNode } from "react"

type Props = {
  children: ReactNode
  publicENV: typeof globalThis.publicENV
}

const RootProvider = ({ children, publicENV }: Props) => {
  const queryClient = getQueryClient()

  useShallowMemo(() => {
    globalThis.publicENV = publicENV
    console.log(
      "Loaded public environment variables",
      globalThis.publicENV?.NEXT_PUBLIC_APP_ENV,
    )
  }, [publicENV])

  return (
    <ChakraProvider value={system}>
      <ThemeProvider
        scriptProps={{
          suppressHydrationWarning: true,
        }}
        attribute="class"
        disableTransitionOnChange
        forcedTheme="light"
        defaultTheme="light"
      >
        <QueryClientProvider client={queryClient}>
          <Toaster toaster={toaster}>{ToastServer}</Toaster>
          <AppKitProvider>{children}</AppKitProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </ChakraProvider>
  )
}

export default memo(RootProvider, (prev, next) => {
  return (
    prev.children === next.children && isEqual(prev.publicENV, next.publicENV)
  )
})
