import * as React from 'react'

import { ConfigContextState, ConfigContext } from '../providers/ConfigProvider'

/**
 * React hook that help checking user device
 *
 * @example
 * ```javascript
 * const config = useConfig()
 * ```
 */
export function useConfig(): ConfigContextState {
  return React.useContext(ConfigContext)
}
