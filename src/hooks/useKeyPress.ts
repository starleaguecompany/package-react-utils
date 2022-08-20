import * as React from 'react'

export type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift'
type Callback = (event: KeyboardEvent) => void
export type EventKeyMap = Partial<Record<EventKeys, Callback>>

interface Props {
  keyMap: EventKeyMap
  enabled: boolean
}

/**
 * React hook that provides an enhanced keydown handler,
 * that's used for key navigation within menus, select dropdowns.
 */
export function useKeyPress(props: Props, deps: React.DependencyList = []): void {
  const { keyMap, enabled } = props

  // If pressed key is our target key then run callback
  function handler(event: KeyboardEvent) {
    const fn = keyMap[event.key as EventKeys]

    if (fn && typeof fn === 'function') {
      fn(event)
    }
  }

  // Add event listeners
  React.useEffect(() => {
    if (enabled) {
      window.addEventListener('keydown', handler)
      // window.addEventListener("keyup", upHandler);
    }

    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', handler)
      // window.removeEventListener("keyup", upHandler);
    }
  }, [enabled, ...deps])
}
