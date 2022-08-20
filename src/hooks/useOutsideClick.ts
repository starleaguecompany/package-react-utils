import React from 'react'

/**
 * React hook that handles click events outside a specific DOM element, like a div. A handler is invoked when a click or touch event happens outside the referenced element.
 *
 * @param ref
 * @param handler
 */
export const useOutsideClick = <T>(
  ref: React.MutableRefObject<T | null> | ((instance: T | null) => void) | null | undefined,
  handler: (event: Event) => void
): void => {
  React.useEffect(() => {
    const listener = (event: Event) => {
      // @ts-ignore
      if (!ref.current || ref.current.contains(event.target)) {
        return
      }

      handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, handler])
}
