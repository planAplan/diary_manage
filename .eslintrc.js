module.exports = {
    plugins: ["react"], // use the plugin rules within ESLint
    parserOptions: {
        ecmaFeatures: {
            jsx: true, // enable JSX support
        },
    },
    settings: {
        react: {
            pragma: "React", // Pragma to use, default to "React"
            version: "detect", // React version
        },
    },
};
