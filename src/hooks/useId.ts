import * as React from 'react'

import { useSafeLayoutEffect } from './useSafeLayoutEffect'

let handoffComplete = false
let id = 0
const genId = () => ++id

/**
 * React hook that always returns an id value that is stable across re-renders
 *
 * @param {string} prefix - a prefix to apply to id
 * @param {string} [explicitId] - an optional explicit value that takes precedence over the generated id
 * @returns {string}
 * @example
 * ```javascript
 * const id = useId('radio-button')
 * ```
 */
export function useId(prefix: string, explicitId?: string): string {
  const initialId = explicitId || (handoffComplete ? genId() : null)
  const [uid, setUid] = React.useState(initialId)

  useSafeLayoutEffect(() => {
    if (uid === null) setUid(genId())
  }, [])

  React.useEffect(() => {
    if (!handoffComplete) {
      handoffComplete = true
    }
  }, [])

  const id = uid != null ? uid.toString() : undefined

  return (prefix ? `${prefix}-${id}` : id) as string
}
