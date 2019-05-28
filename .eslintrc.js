module.exports = {
    extends: "airbnb",
    root: true,
    parser: "babel-eslint",
    plugins: ["react", "jsx-a11y", "import"],
    parserOptions: {
        sourceType: "module"
    },
    env: {
        browser: true
    },
    rules: {
        "react/jsx-filename-extension": [1, {
            "extensions": [".js", ".jsx"]
        }],
        "no-useless-constructor": "off",
        "quotes": [1, "single"],
        "no-duplicate-case": 1,
        "no-tabs": "off",
        "no-mixed-spaces-and-tabs": "off",
        "indent": "off",
        " operator-linebreak": "off",
    }
};