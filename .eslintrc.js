module.exports = {
    plugins: ["react"], // use the plugin rules within ESLint
    env: {
        es6: true,
        browser: true,
        node: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // enable JSX support
        },
        ecmaVersion: 2018,
        sourceType: "module",
    },
    settings: {
        react: {
            pragma: "React", // Pragma to use, default to "React"
            version: "detect", // React version
        },
    },
};
