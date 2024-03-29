import * as React from 'react'

export function useUnmountEffect(fn: () => void, deps: any[] = []): void {
  return React.useEffect(
    () => () => fn(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  )
}
