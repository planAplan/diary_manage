const path = require("path");

const Htmlwebpackplugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'built.js',
        path: path.resolve(__dirname, "build"),
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(jpe?g|gif|png|svg|ico)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: "[hash:10].[ext]",
                }
            },
            {
                test: /\.html?$/,
                loader: "html-loader",
                options: {
                    attributes: {
                        list: [
                            {
                                tag: "link",
                                attribute: "href",
                                type: "src"
                            }
                        ]
                    }
                }
            },
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }
        ]
    },
    plugins: [
        new Htmlwebpackplugin({
            template: './src/index.html',
            // favicon: './src/app.ico'
        }),
    ],
    mode: 'development'
};