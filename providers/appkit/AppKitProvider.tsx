"use client"

// biome-ignore assist/source/organizeImports: <explanation>
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import type { AppKitNetwork } from "@reown/appkit-common"
import { type CaipNetworkId, createAppKit } from "@reown/appkit/react"
import { memo, type ReactNode, useMemo } from "react"
import {
  type Config,
  cookieStorage,
  createStorage,
  type Storage,
  WagmiProvider,
} from "wagmi"
import { TestNet } from "./chainConfigs"

const metadata = {
  name: "Mayfest",
  description: "Connect your wallet to Mayfest",
  url: "https://develop.mayfest.vn", // origin must match your domain & subdomain
  icons: ["https://develop.mayfest.vn/icons/logo/logo.svg"],
}

const walletConnectProjectId = "3ab5de1807b141cc1972fe8125ba600f"

/**
 * AppKitProvider
 * @param param0 children
 * @returns AppKitProvider
 */
const AppKitProvider = ({ children }: { children?: ReactNode }) => {
  const wagmiConfig = useMemo(() => {
    const chainConfig = TestNet

    const wagmiAdapter = new WagmiAdapter({
      storage: createStorage({
        key: "wagmi",
        storage: cookieStorage,
      }) as Storage,
      networks: [chainConfig as AppKitNetwork],
      projectId: walletConnectProjectId,
      ssr: true,
      chains: [chainConfig],
      multiInjectedProviderDiscovery: true,
      syncConnectedChain: false,
      customRpcUrls: {
        [`eip155:${chainConfig.id}` as CaipNetworkId]: [
          {
            url: chainConfig.rpcUrls.default.http[0],
            // config: viemConfig,
          },
        ],
      },
    })

    const wagmiConfig = wagmiAdapter.wagmiConfig as Config

    createAppKit({
      adapters: [wagmiAdapter],
      networks: [chainConfig as AppKitNetwork],
      allowUnsupportedChain: true,
      enableWalletConnect: true,
      enableCoinbase: false,
      enableEIP6963: true,
      enableWallets: true,
      enableInjected: true,
      enableNetworkSwitch: true,
      enableWalletGuide: false,
      enableAuthLogger: true,
      projectId: walletConnectProjectId,
      features: {
        email: false,
        history: true,
        socials: false,
        allWallets: true,
        emailShowWallets: false,
        smartSessions: true,
        swaps: false,
        onramp: false,
      },
      debug: false,
      metadata: metadata,
      themeMode: "light",
      themeVariables: {
        "--w3m-z-index": 999,
      },
    })

    return wagmiConfig
  }, [])

  return (
    <WagmiProvider reconnectOnMount={true} config={wagmiConfig}>
      {children}
    </WagmiProvider>
  )
}

export default memo(AppKitProvider, (prev, next) => {
  return prev.children === next.children
})
