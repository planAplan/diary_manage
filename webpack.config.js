const path = require("path");

const Htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

//webpack server : ReferenceError: resolve is not defined
//增加该辅助函数解决问题
function resolve(dir) {
    return path.resolve(__dirname, "build");
}

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "./",
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.s(a|c)ss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: "url-loader",
                options: {
                    limit: 1000,
                    name: "[hash:10].[ext]",
                },
            },
            {
                test: /\.html?$/,
                loader: "html-loader",
            },
            // {
            //     exclude: /\.(s?(a?|c)ss|js|html)$/,
            //     loader: 'file-loader',
            //     options: {
            //         name: '[hash:10].[ext]'
            //     }
            // }
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Htmlwebpackplugin({
            template: "./src/index.html",
            favicon: "./src/app.ico",
        }),
    ],
    mode: "development",
    devServer: {
        //代表运行时的目录(打包后目录)，也是使用字符串拼接绝对目录
        contentBase: resolve(__dirname, "build"),
        //该参数表示启动gzip压缩
        compress: true,
        //端口号
        port: 8080,
        //自动打开浏览器
        open: false,
        hot: true,
        writeToDisk: true,
    },
};
