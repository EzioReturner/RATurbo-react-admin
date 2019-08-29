module.exports = {
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
  ],
  presets: ['react-app']
};
