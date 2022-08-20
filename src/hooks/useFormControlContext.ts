import * as React from 'react'

import { FormControlContextState, FormControlContext } from '../providers/FormControlProvider'

export function useFormControlContext(): FormControlContextState {
  return React.useContext(FormControlContext)
}
