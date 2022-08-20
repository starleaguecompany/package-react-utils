import * as React from 'react'

type SetValue<T> = (value: T) => void

// A wrapper for "JSON.parse()"" to support "undefined" value
function parseJSON<T>(value: string | null): T | undefined {
  try {
    return value === 'undefined' ? undefined : JSON.parse(value ?? '')
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('parsing error on', { value })
    return undefined
  }
}

/**
 * Persist the state with local storage so that it remains after a page refresh. This can be useful for a dark theme or to record session information
 *
 * @param key
 * @param initialValue
 * @example
 * ```javascript
 * const [isDarkTheme, setDarkTheme] = useLocalStorage('darkTheme', true)
 * ```
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Get from local storage then
  // parse stored json or return initialValue
  const readValue = (): T => {
    // Prevent build error "window is undefined" but keep keep working
    if (typeof window === 'undefined') {
      return initialValue
    }

    try {
      const item = window.localStorage.getItem(key)
      return item ? (parseJSON(item) as T) : initialValue
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error)
      return initialValue
    }
  }

  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = React.useState<T>(readValue)

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue: SetValue<T> = value => {
    // Prevent build error "window is undefined" but keeps working
    if (typeof window == 'undefined') {
      console.warn(`Tried setting localStorage key “${key}” even though environment is not a client`)
    }

    try {
      // Allow value to be a function so we have the same API as useState
      const newValue = value instanceof Function ? value(storedValue) : value

      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(newValue))

      // Save state
      setStoredValue(newValue)
    } catch (error) {
      console.warn(`Error setting localStorage key “${key}”:`, error)
    }
  }

  React.useEffect(() => {
    setStoredValue(readValue())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  React.useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue())
    }

    // this only works for other documents, not the current one
    window.addEventListener('storage', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return [storedValue, setValue]
}
