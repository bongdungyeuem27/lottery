import { useState } from "react"
import { proxy } from "valtio"

export const useStore = <T extends object>(initialState: T) => {
  return useState(proxy(initialState))[0] as T
}
