import { useLocation } from './useLocation'
import * as React from 'react'

function parseSearch(search: string) {
  const urlSearchParams = new URLSearchParams(search)

  // @ts-ignore
  return Object.fromEntries(urlSearchParams.entries())
}

type ReturnType<T> = [T, (params: T) => void]

/**
 * React hook for query params
 *
 * @example
 * ```javascript
 * const [params, setParams] = useQueryParams()
 * ```
 */
export function useQueryParams<T>(): ReturnType<T | Record<string, string>> {
  const { replace, search } = useLocation()
  const [params, setParams] = React.useState(parseSearch(search))

  const set = (params: T) => {
    // @ts-ignore
    const stringParams = new URLSearchParams(params).toString()

    replace(`?${stringParams}`)
  }

  React.useEffect(() => {
    setParams(parseSearch(search))
  }, [search])

  return [params, set]
}
