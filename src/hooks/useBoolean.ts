import * as React from 'react'

type Value = boolean
type InitialState = Value | (() => Value)

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 * @example
 * ```javascript
 * const [visible, setVisible] = useBoolean(false)
 * ```
 */
export function useBoolean(
  initialState: InitialState = false
): [boolean, { on: () => void; off: () => void; toggle: () => void }] {
  const [value, setValue] = React.useState<Value>(initialState)

  const on = React.useCallback(() => {
    setValue(true)
  }, [])

  const off = React.useCallback(() => {
    setValue(false)
  }, [])

  const toggle = React.useCallback(() => {
    setValue(prev => !prev)
  }, [])

  return [value, { on, off, toggle }]
}
