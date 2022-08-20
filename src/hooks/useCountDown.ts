import React from 'react'

import { runIfFn } from '../utils'

export interface UseCountDownProps {
  from: number
  to: number
  speed?: number
  interval?: number
  formatter?: (value: number) => number | string
}

export function useCountDown(props: UseCountDownProps): number | string {
  const { from = 0, to, speed = 500, interval = 100, formatter } = props

  const [count, setCount] = React.useState<number>(from)

  React.useEffect(() => {
    setCount(from)

    const loops = Math.ceil(speed / interval)
    let loopsCount = 0

    const intervalCallback = setInterval(() => {
      if (loops > loopsCount) {
        loopsCount += 1
        setCount(count => {
          const increment = (to - count) / loops

          return count + increment
        })
      } else {
        clearInterval(intervalCallback)

        setCount(to)
      }
    }, interval)

    return () => clearInterval(intervalCallback)
  }, [from, to])

  const value = React.useMemo(() => {
    const nextValue = runIfFn(formatter, count)

    return nextValue !== undefined ? nextValue : count
  }, [count])

  return value
}
