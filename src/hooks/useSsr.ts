import { isBrowser } from '../utils'

/**
 * Quickly know where your code will be executed
 */
export function useSsr() {
  return {
    isBrowser: isBrowser,
    isServer: !isBrowser,
  }
}
