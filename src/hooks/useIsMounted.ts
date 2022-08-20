import * as React from 'react'

/**
 * This React hook help you to avoid this error with a function that return a boolean, `isMounted`.
 *
 * @example
 * ```javascript
 * const isMounted = useIsMounted()
 * ```
 */
export function useIsMounted(): () => boolean {
  const isMounted = React.useRef(false)

  React.useEffect(() => {
    isMounted.current = true

    return () => {
      isMounted.current = false
    }
  }, [])

  return React.useCallback(() => isMounted.current, [])
}
