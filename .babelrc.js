module.exports = {
  env: {
    development: {
      plugins: [['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]]
    }
  },
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'react-hot-loader/babel'
  ],
  presets: [
    ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
