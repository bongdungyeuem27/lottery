import { createToaster } from "@chakra-ui/react"

export const toaster = createToaster({
  placement: "top-end",
  // overlap: true,
  duration: 5000,
  pauseOnPageIdle: true,
})
