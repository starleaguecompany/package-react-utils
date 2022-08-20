import * as React from 'react'

export interface FormControlContextState {
  invalid: boolean
  disabled: boolean
}

export const FormControlContext: React.Context<FormControlContextState> = React.createContext<FormControlContextState>({
  invalid: false,
  disabled: false,
})

export const FormControlProvider = FormControlContext.Provider
