module.exports = {
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'react-hot-loader/babel',
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
  ],
  presets: [
    ['@babel/preset-env', { targets: { browsers: 'last 2 versions' } }],
    '@babel/preset-typescript',
    '@babel/preset-react'
  ]
};
