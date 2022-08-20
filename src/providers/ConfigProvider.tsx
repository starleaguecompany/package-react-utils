import * as React from 'react'

export interface ConfigContextState {
  gatewayUrl?: string
  publicUrl?: string
  apiGateWayURL?: string
  environment?: string
}

export const ConfigContext: React.Context<ConfigContextState> = React.createContext<ConfigContextState>({
  apiGateWayURL: '',
  gatewayUrl: '',
  publicUrl: '',
})

export const ConfigProvider = ConfigContext.Provider
