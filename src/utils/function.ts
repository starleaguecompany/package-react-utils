import { __DEV__, isFunction } from './assertion'
import { AnyFunction } from './types'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const noop = () => {}

export function runIfFn<T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): T {
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn
}

export function once<T extends AnyFunction>(fn?: T | null) {
  let result: any

  return function func(this: any, ...args: Parameters<T>) {
    if (fn) {
      result = fn.apply(this, args)
      fn = null
    }

    return result
  }
}

type MessageOptions = {
  condition: boolean
  message: string
}

export const warn = once((options: MessageOptions) => () => {
  const { condition, message } = options

  if (condition && __DEV__) {
    console.warn(message)
  }
})

export const error = once((options: MessageOptions) => () => {
  const { condition, message } = options

  if (condition && __DEV__) {
    console.error(message)
  }
})

// eslint-disable-next-line @typescript-eslint/ban-types
export function safeInvoke(fn: Function | undefined, ...args: unknown[]): void {
  if (typeof fn === 'function') {
    return fn(...args)
  }
}

export function debounce(func: AnyFunction, wait = 300, immediate = false) {
  let timeout: NodeJS.Timeout | null

  return function executedFunction(...args: unknown[]) {
    const later = function () {
      timeout = null
      if (!immediate) func.apply(this, args)
    }

    // @ts-ignore
    clearTimeout(timeout)

    timeout = setTimeout(later, wait)

    if (immediate) func.apply(this, args)
  }
}
