import * as React from 'react'

import { DeviceInfoContextState, DeviceInfoContext } from '../providers/DeviceInfoProvider'

/**
 * React hook that help checking user device
 *
 * @example
 * ```javascript
 * const isMobile = useIsMobile()
 * const isTablet = useIsTablet()
 * const isPhone = useIsPhone()
 * ```
 */
export function useDeviceInfoContext(): DeviceInfoContextState {
  return React.useContext(DeviceInfoContext)
}

export function useIsPhone(): boolean {
  const { phone } = useDeviceInfoContext()

  return phone
}

export function useIsTablet(): boolean {
  const { tablet } = useDeviceInfoContext()

  return tablet
}

export function useIsMobile(): boolean {
  const { phone, tablet } = useDeviceInfoContext()

  return phone || tablet
}
