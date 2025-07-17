import { omit, pick } from "lodash"
import { useRouter } from "next/navigation"
import qs from "qs"
import { useCallback } from "react"

export const useSetRouter = (configs?: {
  cleanUp?: { keepQueries?: string[] }
  removeQueries?: string[]
  scroll?: boolean
}) => {
  const router = useRouter()

  return useCallback(
    (
      pathname: string,
      query?: Record<string, any>,
      options?: { hash?: string },
    ) => {
      const queryString = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      })

      const newQueryString = qs.stringify(
        omit(
          {
            ...(configs?.cleanUp ? {} : queryString),
            ...pick(queryString, configs?.cleanUp?.keepQueries || []),
            ...(query || {}),
          },
          configs?.removeQueries || [],
        ),
      )
      const newHash = options?.hash || window.location.hash
      const newSearch = newQueryString ? `?${newQueryString}` : ""
      const newUrl = `${pathname}${newSearch}${newHash}`
      router.push(newUrl, { scroll: Boolean(configs?.scroll) })
    },
    [
      router,
      configs?.cleanUp,
      configs?.removeQueries,
      configs?.cleanUp?.keepQueries,
      configs?.scroll,
    ],
  )
}
