import * as React from 'react'

require('./demo.css')

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  backgrounds: {
    disable: true,
    grid: {
      disable: true,
    },
  },
  options: {
    storySort: {
      order: [['Basic']],
    },
  },
}

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
  },
}
