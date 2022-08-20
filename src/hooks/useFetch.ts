import * as React from 'react'

import { useBoolean } from './useBoolean'

enum HTTPMethod {
  DELETE = 'DELETE',
  GET = 'GET',
  HEAD = 'HEAD',
  PATCH = 'PATCH',
  POST = 'POST',
  PUT = 'PUT',
}
type UFBody = BodyInit | Record<string, string>
type FetchFn = (body?: UFBody) => Promise<void>
type ReturnType<T> = [
  state: {
    loading: boolean
    error: Error | null
    data: T | null
    get: FetchFn
    post: FetchFn
    del: FetchFn
    patch: FetchFn
    put: FetchFn
    head: FetchFn
  },
  cancel: () => void
]

/**
 * React Hook which aims to retrieve data on an API using the native Fetch API
 * If the last argument of useFetch is not a dependency array [], then it will not fire until you call one of the http methods like get, post, etc.
 *
 * @param url
 * @param options
 * @param deps
 * @example
 * ```javascript
 * const [{ data, error, loading }, cancel] = useFetch<Data>(url, options)
 * ```
 */
export function useFetch<T = unknown>(url: string, options?: RequestInit, deps?: React.DependencyList): ReturnType<T> {
  const [loading, setLoading] = useBoolean(false)
  const [data, setData] = React.useState<T | null>(null)
  const [error, setError] = React.useState<Error | null>(null)
  const controller = React.useRef<AbortController>()

  const cancel = () => {
    controller.current?.abort()
  }

  const makeFetch = (method: HTTPMethod): FetchFn => {
    return async (body?: UFBody): Promise<void> => {
      let route = url
      const init = {
        headers: {
          'Content-Type': 'application/json',
        },
        ...options,
        method,
        signal: controller.current?.signal,
      }

      if (body) {
        if (method === HTTPMethod.GET || method === HTTPMethod.HEAD) {
          let stringParams

          if (body instanceof URLSearchParams) {
            stringParams = body.toString()
          } else {
            // @ts-ignore
            stringParams = new URLSearchParams(body).toString()
          }

          route = `${route}?${stringParams}`
        } else {
          if (body instanceof FormData || body instanceof URLSearchParams) {
            init.body = body
          } else {
            init.body = JSON.stringify(body)
          }
        }
      }

      controller.current = new AbortController()

      setLoading.on()
      setError(null)

      try {
        const response = await fetch(route, init)

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T

        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        controller.current = undefined
      }

      setLoading.off()
    }
  }

  const get = React.useCallback(makeFetch(HTTPMethod.GET), [url, options])
  const post = React.useCallback(makeFetch(HTTPMethod.POST), [url, options])
  const del = React.useCallback(makeFetch(HTTPMethod.DELETE), [url, options])
  const patch = React.useCallback(makeFetch(HTTPMethod.PATCH), [url, options])
  const put = React.useCallback(makeFetch(HTTPMethod.PUT), [url, options])
  const head = React.useCallback(makeFetch(HTTPMethod.HEAD), [url, options])

  React.useEffect(() => {
    if (!Array.isArray(deps)) {
      return
    }

    makeFetch((options?.method as HTTPMethod) || HTTPMethod.GET)()

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancel()
      setLoading.off()
      controller.current = undefined
    }
  }, deps)

  return [
    {
      loading,
      error,
      data,
      get,
      post,
      del,
      patch,
      put,
      head,
    },
    cancel,
  ]
}
