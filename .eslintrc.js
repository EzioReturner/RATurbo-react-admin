module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: ['prettier/@typescript-eslint', 'plugin:prettier/recommended'],
  settings: {
    react: {
      pragma: 'React',
      version: 'detect'
    }
  },
  plugins: ['react-hooks'],
  rules: {
    'no-console': 0,
    'prettier/prettier': 'error',
    'react-hooks/rules-of-hooks': 'warn',
    'react-hooks/exhaustive-deps': 'warn'
  },
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  }
};
