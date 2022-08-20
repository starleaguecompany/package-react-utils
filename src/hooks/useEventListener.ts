import * as React from 'react'

import { isBrowser } from '../utils'
import { useCallbackRef } from './useCallbackRef'

/**
 * React hook to manage browser event listeners
 *
 * @param event the event name
 * @param handler the event handler function to execute
 * @param element the element to execute against (defaults to `document`)
 * @param options the event listener options
 * @example
 * ```javascript
 * useEventListener("transitionend", onFocus, element)
 * ```
 */
export function useEventListener<K extends keyof DocumentEventMap>(
  event: K | string,
  handler: (event: DocumentEventMap[K]) => void,
  element: Document | HTMLElement | null = isBrowser ? document : null,
  options?: boolean | AddEventListenerOptions
) {
  const fn = useCallbackRef(handler) as any

  React.useEffect(() => {
    if (!element) return undefined

    const listener = (event: any) => {
      fn(event)
    }

    element.addEventListener(event, listener, options)
    return () => {
      element.removeEventListener(event, listener, options)
    }
  }, [event, element, options, fn])

  return () => {
    element?.removeEventListener(event, fn, options)
  }
}
