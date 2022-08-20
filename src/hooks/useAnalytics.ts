import * as React from 'react'

interface Payload {
  event: string
  eventCategory: string
  eventAction: string
  eventLabel: string
  eventValue?: string | number
}

/**
 * React hook for send GA events
 *
 * @example
 * ``` javascript
 * const { pushEvent } = useAnalytics()
 *
 * pushEvent({
 *    event: 'adEvent',
 *    eventCategory: 'Прочее',
 *    eventAction: 'Переход из меню',
 *    eventLabel: `${label}|ЛК`,
 * })
 * ```
 */
export function useAnalytics(): { pushEvent: (payload: Payload) => void } {
  const pushEvent = React.useCallback((payload: Payload) => {
    // @ts-ignore
    window.dataLayer.push(payload)
  }, [])

  React.useEffect(() => {
    // @ts-ignore
    window.dataLayer = window.dataLayer || []
  }, [])

  return { pushEvent }
}
