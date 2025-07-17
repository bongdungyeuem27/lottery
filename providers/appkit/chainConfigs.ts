"use client"

import type { Chain } from "viem"

export const TestNet = {
  id: 1328,
  name: "SEI Testnet",
  nativeCurrency: { name: "SEI", symbol: "SEI", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://rpc-evm-atlantic-2.seitrace.com"],
    },
    public: {
      http: ["https://rpc-evm-atlantic-2.seitrace.com"],
    },
  },
  blockExplorers: {
    default: { name: "Seitrace", url: "https://seitrace.com" },
  },
  testnet: true,
} as const satisfies Chain
