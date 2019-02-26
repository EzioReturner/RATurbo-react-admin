module.exports = {
	root: true,
	parser: 'babel-eslint',
	parserOptions: {
		sourceType: 'module'
	},
	env: {
		browser: true
	},
	rules: {
		'no-useless-constructor': 'off',
		quotes: [1, 'single'],
		'no-duplicate-case': 1,
		'no-undef': 1,
		'no-unused-vars': 1
	}
};
