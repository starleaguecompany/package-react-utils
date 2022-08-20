import * as React from 'react'

import { findIndex, removeIndex, addItem } from '../utils/array'
import { useStateCallback } from './useStateCallback'

type Value<T> = Array<T>
type InitialState<T> = Value<T> | (() => Value<T>)
type Callback<T> = (value: Value<T>) => void
type DispatchWithCallback<T> = (value: T, callback?: Callback<T>) => void

/**
 * React hook to manage multiply value states
 *
 * @param initialState the initial value state
 * @example
 * ```javascript
 * const [innerValue, setInnerValue] = useMultiValue<string | number>(defaultIndex || [])
 * ```
 */
export function useMultiValue<T>(initialState: InitialState<T> = []): [Value<T>, DispatchWithCallback<T>] {
  const [value, setValue] = useStateCallback<Value<T>>(initialState)

  const update = React.useCallback(
    (val: T, callback?: Callback<T>) => {
      const pos = findIndex<T>(value, val)

      setValue(pos >= 0 ? removeIndex<T>(value, pos) : addItem<T>(value, val), callback)
    },
    [value]
  )

  return [value, update]
}
