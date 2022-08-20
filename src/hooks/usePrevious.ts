import { useRef, useEffect } from 'react'

/**
 * React hook to persist any value between renders,
 * but keeps it up-to-date if it changes.
 *
 * @param value
 * @example
 * ```javascript
 * const previous = usePrevious<string>(value)
 * ```
 */
export function usePrevious<T>(value: T): T {
  const ref = useRef<T | undefined>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current as T
}
