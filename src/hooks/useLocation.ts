import * as React from 'react'

import { AnyFunction } from '../utils'

function getCurrentLocation() {
  return {
    pathname: window.location.pathname,
    search: window.location.search,
  }
}

const listeners: AnyFunction[] = []

type ReturnType = {
  push: (url: string) => void
  replace: (url: string) => void
  pathname: string
  search: string
}

/**
 * React hook for window location
 *
 * @example
 * ```javascript
 * const { push, replace, pathname, search } = useLocation()
 * ```
 */
export function useLocation(): ReturnType {
  const [{ pathname, search }, setLocation] = React.useState(getCurrentLocation())

  /** All components using the 'useLocation' hook will update. */
  function notify() {
    listeners.forEach(listener => listener())
  }

  function handleChange() {
    setLocation(getCurrentLocation())
  }

  React.useEffect(() => {
    listeners.push(handleChange)
    window.addEventListener('popstate', handleChange)

    return () => {
      listeners.splice(listeners.indexOf(handleChange), 1)
      window.removeEventListener('popstate', handleChange)
    }
  }, [])

  function push(url: string) {
    window.history.pushState(null, '', url)
    notify()
  }

  function replace(url: string) {
    window.history.replaceState(null, '', url)
    notify()
  }

  return {
    push,
    replace,
    pathname,
    search,
  }
}
