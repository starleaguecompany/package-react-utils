import * as React from 'react'

import { usePrevious } from './usePrevious'

/**
 * This hook allows you to debounce any fast changing value.
 *
 * @param value the value to execute
 * @param delay the delay (in ms)
 * @example
 * ```javascript
 * const [innerValue, setInnerValue] = React.useState<number>(value)
 * const debouncedInnerValue = useDebounce<number>(innerValue, 300)
 * ```
 */
export function useDebounceValue<T>(value: T, delay: number): T {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = React.useState<T>(value)
  // Prevent first render
  const previous = usePrevious<T>(debouncedValue)

  React.useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        if (previous !== value) {
          setDebouncedValue(value)
        }
      }, delay)
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler)
      }
    },
    [value, delay] // Only re-call effect if value or delay changes
  )

  return debouncedValue
}
