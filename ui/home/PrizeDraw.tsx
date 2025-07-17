"use client"

import { Box, Button, Image, Stack } from "@chakra-ui/react"
import { toaster } from "components/server/toast/toast.config"
import AnimatedLottie from "components/shared/lottie/AnimatedLottie"
import { useWallet } from "hooks/client/useWallet"
import cartJSON from "public/lotties/cart.json"
import { memo } from "react"
import { useWriteContract } from "wagmi"
import { abi, contract } from "./abi"

type Props = {}

const PrizeDraw = ({}: Props) => {
  const { account, handleConnect } = useWallet()

  console.log(account)

  const { writeContractAsync, isPending: isWithdrawing } = useWriteContract({
    mutation: {
      onSuccess: () => {
        toaster.success({
          title: "Quay thưởng thành công",
        })
      },
      onError: (error) => {
        console.log(error)
        toaster.error({
          title: "Quay thưởng thất bại",
        })
      },
    },
  })

  return (
    <Stack gap={2} position="relative" maxW="1000px" width="100%" mx="auto">
      <Image
        width="100%"
        aspectRatio={0.45}
        zIndex={-1}
        src="/images/prize_draw.png"
        alt="prize_draw"
      />

      <Button
        loading={account.isConnecting || account.isReconnecting}
        hidden={!!account.isConnected}
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        variant="subtle"
        size="xxxl"
        textStyle="175"
        colorScheme="mixed.orange"
        borderRadius={4}
        onClick={() => handleConnect()}
      >
        Kết nối ví
      </Button>
      <Button
        hidden={!account.isConnected}
        loading={isWithdrawing}
        position="absolute"
        top="45%"
        left="50%"
        transform="translate(-50%, -50%)"
        variant="solid"
        colorPalette="orange"
        size="xxxl"
        textStyle="175"
        borderRadius={4}
        onClick={() =>
          writeContractAsync({
            abi: abi,
            address: contract,
            account: account.address!,
            functionName: "drawAndReset",
            args: [],
          })
        }
      >
        <span>Rút thưởng</span>
        <Box
          position="relative"
          width={{
            base: 8,
            sm: 10,
          }}
          flexShrink={0}
        >
          <AnimatedLottie
            pointerEvents="none"
            left={0}
            top="50%"
            transform="translate(-0.75rem, -60%)"
            position="absolute"
            zIndex={2}
            data={cartJSON}
            boxSize="9rem"
            alignSelf="flex-end"
          />
        </Box>
      </Button>
    </Stack>
  )
}

export default memo(PrizeDraw)
