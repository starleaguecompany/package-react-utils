import { create } from '@storybook/theming/create'

import logo from './logo.svg'

export default create({
  base: 'light',

  // colorPrimary: 'var(--color-M06)',
  // colorSecondary: 'var(--color-background)',

  // UI
  // appBg: 'var(--color-background)',
  // appContentBg: 'var(--color-background)',
  // appBorderColor: 'var(--color-M06)',
  // appBorderRadius: 4,
  //
  // // Typography
  // fontBase: '"Open Sans", sans-serif',
  // fontCode: 'monospace',
  //
  // // Text colors
  // textColor: 'var(--color-M100)',
  // textInverseColor: 'rgba(255,255,255,0.9)',
  //
  // // Toolbar default and active colors
  // barTextColor: 'var(--color-M100)',
  // barSelectedColor: 'black',
  // barBg: 'var(--color-M06)',

  brandImage: logo,
})
