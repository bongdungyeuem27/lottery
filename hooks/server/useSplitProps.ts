import { transform } from "lodash"
import { useMemo } from "react"

export const useSplitProps = <
  T extends Record<string, any>,
  K extends string[] = Extract<keyof T, string>[],
>(
  props: T,
  keys: K,
) => {
  return useMemo(() => {
    const KEYS = new Set(keys)
    return transform(
      props as any,
      (result, value, key: any) => {
        if (KEYS.has(key)) {
          result[0][key as never] = value as never
        } else {
          ;(result[1] as never)[key as never] = value as never
        }
      },
      [{} as never, {} as never],
    )
  }, [props, keys]) as [Pick<T, K[number]>, Omit<T, K[number]>]
}
