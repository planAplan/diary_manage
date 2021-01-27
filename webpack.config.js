const path = require("path");

const Htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");

//webpack server : ReferenceError: resolve is not defined
//增加该辅助函数解决问题
function resolve(dir) {
    return path.resolve(__dirname, "build");
}

//复用loader
const commonCssLoader = [
    // 'style-loader':创建style标签，将样式放入
    //使用以下loader取代style-loader，作用：提取js中的css成单独文件
    MiniCssExtractPlugin.loader,
    //将css文件整合到js文件中
    "css-loader",
    //css兼容性处理
    {
        //还需要在webpack.json中定义browserslist
        loader: "postcss-loader",
        options: {
            ident: "postcss",
            //指定插件
            plugins: () => [require("postcss-preset-env")()],
        },
    },
];
const EslintOptions = {
    fix: true,
    threads: 4,
};
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/built.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "./",
    },
    module: {
        rules: [
            //处理css文件
            {
                test: /\.css$/,
                //通过扩展运算符使用封装的loader
                use: [...commonCssLoader],
            },
            //处理less文件
            {
                test: /\.less$/,
                //由于use数组执行顺序为从下往上(注意执行顺序)，经过less-loader转换为css后再进行兼容性处理
                use: [
                    ...commonCssLoader,
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            // Options
                                        },
                                    ],
                                ],
                            },
                        },
                    },
                    "sass-loader",
                ],
            },
            // {
            //     loader: "postcss-loader",
            //     options: {
            //         //固定写法
            //         ident: "postcss",
            //         plugins: () => [
            //             //postcss的插件
            //             require("postcss-preset-env")(),
            //         ],
            //     },
            // },
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: "url-loader",
                options: {
                    // outputPath: "images",
                    limit: 8 * 1024,
                    // limit: 50,
                    name: "images/[hash:10].[ext]",
                },
            },
            {
                test: /\.html?$/,
                loader: "html-loader",
            },
            /**
             * js兼容性处理：babel-loader
             */
            {
                test: /\.js/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    //预设：指示babel做怎样的兼容性处理,一般使用@babel/preset-env就可以了
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                //按需加载
                                useBuiltIns: "usage",
                                //指定corejs版本
                                corejs: {
                                    version: 3,
                                },
                                //指定兼容性做到那个版本浏览器
                                targets: {
                                    chrome: "60",
                                    firefox: "60",
                                    ie: "9",
                                    safari: "10",
                                    edge: "17",
                                },
                            },
                        ],
                    ],
                },
            },
            // {
            //     // test: /\.(ico)$/i,
            //     exclude: /\.(s?(a?|c)ss|js|html)$/,
            //     loader: "file-loader",
            //     options: {
            //         name: "[hash:10].[ext]",
            //         outputPath: "assets",
            //     },
            // },
        ],
    },
    plugins: [
        new CleanWebpackPlugin(),
        new Htmlwebpackplugin({
            template: "./src/index.html",
            // favicon: "./src/app.ico",
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true,
            },
        }),
        new FaviconsWebpackPlugin("./src/app.ico"),
        new MiniCssExtractPlugin({
            //对输出的css文件进行重命名
            filename: "css/built.css",
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        new ESLintPlugin(EslintOptions),
    ],
    //mode改为生产模式 production ，就会自动压缩js代码
    mode: "development",
    //已经不支持如下这种写法了 使用：target: ['web', 'es5']
    // browserslist: {
    //     //这是开发环境
    //     development: [
    //         "last 1 chrome version",
    //         "last 1 firefox version",
    //         "last 1 safari version",
    //     ],
    //     //生产环境，
    //     production: [
    //         //表示兼容大于99.8%的浏览器
    //         ">0.2%",
    //         //不要已经死的浏览器，比如IE10
    //         "not dead",
    //         //还有所有的op_mini浏览器
    //         "not op_mini all",
    //     ],
    // },
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
