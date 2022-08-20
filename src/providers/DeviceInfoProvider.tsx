import * as React from 'react'

import { debounce } from '../utils'

export interface DeviceInfoContextState {
  tablet: boolean
  phone: boolean
}

export const DeviceInfoContext: React.Context<DeviceInfoContextState> = React.createContext<DeviceInfoContextState>({
  tablet: false,
  phone: false,
})

export function DeviceInfoProvider({ initialInfo, children }: { initialInfo: DeviceInfoContextState; children: any }) {
  const [currentInfo, setCurrentInfo] = React.useState<DeviceInfoContextState>(initialInfo)

  React.useEffect(() => {
    function update() {
      const isDesktop = window.matchMedia(`(min-width: 1024px)`).matches
      const isTablet = window.matchMedia(`(min-width: 768px)`).matches
      const newInfo: DeviceInfoContextState = {
        phone: !isDesktop && !isTablet,
        tablet: !isDesktop && isTablet,
      }

      if (newInfo.tablet !== currentInfo.tablet || newInfo.phone !== currentInfo.phone) {
        setCurrentInfo(newInfo)
      }
    }

    update()
    const debouncedUpdate = debounce(update, 150)

    window.addEventListener('resize', debouncedUpdate)

    return () => {
      window.removeEventListener('resize', debouncedUpdate)
    }
  }, [currentInfo])

  return <DeviceInfoContext.Provider value={currentInfo}>{children}</DeviceInfoContext.Provider>
}
