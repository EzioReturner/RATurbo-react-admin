module.exports = {
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
    'react-hot-loader/babel',
    ['import',
      {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true
      },
      'antd'
    ],
    ['import', { libraryName: 'antd-mobile', style: true }, 'antd-mobile']
  ],
  presets: [
    ['@babel/env', { targets: { browsers: 'last 2 versions' } }],
    '@babel/typescript',
    '@babel/react'
  ]
};
