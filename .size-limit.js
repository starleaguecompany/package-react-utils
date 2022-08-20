const modifier = config => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
      ],
    },
  }
}

module.exports = [
  {
    name: 'package',
    path: 'dist/esm/index.js',
    limit: '130 KB',
    running: false,
    modifyWebpackConfig: modifier,
  },
]
