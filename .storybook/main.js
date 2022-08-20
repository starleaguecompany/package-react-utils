const path = require('path')

module.exports = {
  stories: [
    // "../src/**/*.stories.mdx",
    '../src/**/*.stories.tsx',
  ],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  // core: {
  //   "builder": "webpack5"
  // },
  webpackFinal: async config => {
    config.resolve.extensions.push('.less')
    config.module.rules.push({
      test: /\.less$/,
      exclude: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            importLoaders: 2,
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer'), require('cssnano')({ preset: 'default' })],
            },
          },
        },
        'less-loader',
      ],
      include: path.resolve(__dirname, '../src'),
    })
    config.module.rules.push({
      test: /\.module\.less$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            esModule: true,
            importLoaders: 2,
            modules: {
              exportGlobals: true,
              exportOnlyLocals: false,
              localIdentName: '[name]__[local]--[hash:base64:5]',
              localIdentContext: path.resolve(__dirname, '../src'),
            },
          },
        },
        {
          loader: require.resolve('postcss-loader'),
          options: {
            postcssOptions: {
              plugins: [require('autoprefixer'), require('cssnano')({ preset: 'default' })],
            },
          },
        },
        'less-loader',
      ],
      include: path.resolve(__dirname, '../src'),
    })

    return config
  },
}
