import { customThrottle, useMemoEffect } from "hooks/client/useShallow"
import { debounce } from "lodash"
import { useSearchParams } from "next/navigation"
import { useCallback, useMemo, useRef, useState } from "react"
import { useSetQuery } from "./useSetQuery"

export const useSetStateQuery = <
  T extends string | string[] | undefined = string | undefined,
  R extends Primitive | Primitive[] | undefined = T,
  E extends Primitive | Primitive[] | undefined = T,
>(
  queryName: string,
  _ = [],
  options?: {
    isActive?: boolean
    debounce?: number
    throttle?: number
    decode?: (value: T) => R
    encode?: (value: E) => T
    cleanUp?: { keepQueries?: string[] }
    removeQueries?: string[]
    scroll?: boolean
  },
): [R, (nextValue: E | ((e: R) => E)) => void] => {
  const setQuery = useSetQuery(queryName, {
    cleanUp: options?.cleanUp,
    removeQueries: options?.removeQueries,
    scroll: options?.scroll,
  })

  const searchParams = useSearchParams()

  const queryValue = useMemo(() => {
    return searchParams.get(queryName)
  }, [searchParams, queryName])

  const valueRef = useRef<any>(queryValue)
  const [, forceUpdate] = useState(0)

  useMemoEffect(() => {
    if (options?.isActive === false) return
    valueRef.current = queryValue
  }, [queryValue, options?.isActive])

  const setValue = useCallback(
    (options?.throttle ? customThrottle : debounce)(
      (nextValueOrFunction: any) => {
        const nextValue =
          typeof nextValueOrFunction === "function"
            ? nextValueOrFunction(valueRef.current)
            : nextValueOrFunction

        const tempValue = options?.encode
          ? options.encode(nextValue)
          : nextValue
        const lastValue = valueRef.current
        valueRef.current = tempValue
        if (lastValue !== tempValue) {
          forceUpdate((prev) => prev + 1)
        }
        setQuery(tempValue)
      },
      options?.throttle || options?.debounce || 100,
    ),
    [options?.throttle, options?.debounce, setQuery],
  )

  const value = useMemo(() => {
    try {
      if (options?.decode) return options.decode(valueRef.current)
      return valueRef.current
    } catch (error) {
      console.log(error)
      return null
    }
  }, [valueRef.current, options?.decode])

  return [value, setValue]
}
