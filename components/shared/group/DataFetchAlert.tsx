import { Alert } from "@chakra-ui/react"
import { memo } from "react"

const DataFetchAlert = (props: Alert.RootProps) => {
  return (
    <Alert.Root variant="outline" status="error" width="fit-content" {...props}>
      <Alert.Description>
        Something went wrong. Try refreshing the page or come back later.
      </Alert.Description>
    </Alert.Root>
  )
}

export default memo(DataFetchAlert, () => true)
