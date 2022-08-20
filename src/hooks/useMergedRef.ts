import * as React from 'react'

type ReactRef<T> = React.Ref<T> | React.MutableRefObject<T>

export function assignRef<T = any>(ref: ReactRef<T> | undefined, value: T): void {
  if (ref == null) return

  if (typeof ref === 'function') {
    ref(value)
    return
  }

  try {
    // @ts-ignore
    ref.current = value
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
  }
}

/**
 * React hook that merges react refs into a single memoized function
 *
 * @example
 * ```javascript
 * const referenceRef = useMergedRef(elementRef, ref)
 * ```
 */
export function useMergedRef<T>(...refs: (ReactRef<T> | undefined)[]) {
  return React.useMemo(() => {
    if (refs.every(ref => ref == null)) {
      return null
    }
    return (node: T) => {
      refs.forEach(ref => {
        if (ref) assignRef(ref, node)
      })
    }
  }, refs)
}
