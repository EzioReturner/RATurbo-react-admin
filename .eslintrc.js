module.exports = {
    root: true,
    parser: 'babel-eslint',
    plugins: ['react', 'jsx-a11y', 'import'],
    extends: [
        'airbnb',
        'eslint:recommended',
        'plugin:react/recommended'
    ],
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        browser: true,
        node: true
    },
    rules: {
        'react/jsx-uses-vars': 1,
        'react/jsx-uses-react': 1,
        'react/jsx-filename-extension': [
            1,
            {
                extensions: ['.js', '.jsx'],
            },
        ],
        'react/sort-comp': 'off',
        'react/jsx-indent': 'off',
        'react/jsx-indent-props': 'off',
        'react/require-default-props': 'off',
        'react/prop-types': 'off',
        'react/destructuring-assignment': 'off',
        'react/jsx-first-prop-new-line': 'off',
        'react/no-array-index-key': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/display-name': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/jsx-max-props-per-line': [1, {
            "maximum": 2
        }],
        'react/forbid-prop-types': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'import/prefer-default-export': 'off',
        'no-useless-constructor': 'off',
        'quotes': [1, 'single'],
        'no-duplicate-case': 1,
        'no-tabs': 'off',
        'no-mixed-spaces-and-tabs': 'off',
        'indent': 'off',
        'operator-linebreak': 'off',
        'import/no-unresolved': 'off',
        'comma-dangle': 'off',
        'arrow-parens': 'off',
        'arrow-body-style': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'eol-last': 'off',
        'jsx-a11y/anchor-is-valid': 'off',
        'no-const-assign': 'off',
        'no-console': 'off',
    },
};