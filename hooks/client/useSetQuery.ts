"use client"

import { omit, pick } from "lodash"
import { useRouter } from "next/navigation"
import qs from "qs"
import { useCallback } from "react"

export const useSetQuery = (
  queryName: string,
  configs?: {
    cleanUp?: { keepQueries?: string[] }
    removeQueries?: string[]
    scroll?: boolean
  },
) => {
  const router = useRouter()

  return useCallback(
    (value: any, options?: { hash?: string }) => {
      const queryString = qs.parse(window.location.search, {
        ignoreQueryPrefix: true,
      })

      const newQueryString = qs.stringify(
        omit(
          {
            ...(configs?.cleanUp ? {} : queryString),
            ...pick(queryString, configs?.cleanUp?.keepQueries || []),
            [queryName]: value,
          },
          configs?.removeQueries || [],
        ),
      )
      const newPathname = window.location.pathname
      const newHash = options?.hash || window.location.hash
      const newSearch = newQueryString ? `?${newQueryString}` : ""
      const newUrl = `${newPathname}${newSearch}${newHash}`
      router.push(newUrl, { scroll: Boolean(configs?.scroll) })
      return newUrl
    },
    [
      queryName,
      router,
      configs?.cleanUp,
      configs?.removeQueries,
      configs?.cleanUp?.keepQueries,
      configs?.scroll,
    ],
  )
}
