import * as React from 'react'

type Callback<T> = (value?: T) => void
type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void

/**
 * React hook that manage state with callback on change
 *
 * @param initialState
 * @example
 * ```
 * const [innerValue, setInnerValue] = useStateCallback<string | number | Array<string | number> | undefined>(value)
 *
 * setInnerValue(data, (val) => {
 *   safeInvoke(onChange, val)
 * })
 * ```
 */
export function useStateCallback<T>(initialState: T | (() => T)): [T, DispatchWithCallback<React.SetStateAction<T>>] {
  const [state, _setState] = React.useState(initialState)

  const callbackRef = React.useRef<Callback<T>>()
  const isFirstCallbackCall = React.useRef<boolean>(true)

  const setState = React.useCallback((setStateAction: React.SetStateAction<T>, callback?: Callback<T>): void => {
    callbackRef.current = callback
    _setState(setStateAction)
  }, [])

  React.useEffect(() => {
    if (isFirstCallbackCall.current) {
      isFirstCallbackCall.current = false
      return
    }
    callbackRef.current?.(state)
  }, [state])

  return [state, setState]
}
