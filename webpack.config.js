const path = require("path");

const Htmlwebpackplugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const threadLoader = require("thread-loader");

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
];
const EslintOptions = {
    fix: true,
    threads: 4,
};

threadLoader.warmup(
    {
        // 池选项，例如传递给 loader 选项
        // 必须匹配 loader 选项才能启动正确的池
    },
    [
        // 加载模块
        // 可以是任意模块，例如
        "babel-loader",
        "@babel/preset-env",
        "babel-plugin-import",
        // "sass-loader",
        "less-loader",
        "postcss-loader",
        "postcss-preset-env",
        "url-loader",
        "html-loader",
    ]
);

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "./",
    },
    // resolve: { extensions: [".jsx", ".js", ".json"] },
    module: {
        rules: [
            //处理css文件
            {
                test: /\.css$/,
                //通过扩展运算符使用封装的loader
                use: [...commonCssLoader],
            },
            //处理scss文件
            {
                test: /\.less$/i,
                //由于use数组执行顺序为从下往上(注意执行顺序)，经过less-loader转换为css后再进行兼容性处理
                use: [
                    ...commonCssLoader,
                    {
                        loader: "less-loader", // compiles Less to CSS
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    // "@primary-color": "#F8D57E", //"#1DA57A",
                                    // "@font-family": `Gilroy-Bold Gilroy-Regular -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial,
                                    // 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
                                    // 'Noto Color Emoji'`,
                                    // "@body-background": " #F6F7FB",
                                    // "link-color": "#1DA57A",
                                    // "border-radius-base": "2px",
                                    // or
                                    'any_word_you_like': `; @import "./src/css/my-default-style.less";` // Override with less file
                                    // hack: `true;@import "${require.resolve('./src/css/my-default-style.js')}";`, 
                                },
                            },
                        },
                    },
                ],
            },
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
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
                options: {
                    exclude: [
                        // \\ for Windows, \/ for Mac OS and Linux
                        /node_modules[\\\/]core-js/,
                        /node_modules[\\\/]webpack[\\\/]buildin/,
                    ],
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
                        "@babel/preset-react",
                    ],
                    plugins: [
                        [
                            "@babel/plugin-transform-runtime",
                            {
                                corejs: 3,
                            },
                        ],
                        ["import", { libraryName: "antd", style: true }],
                    ],
                },
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                type: "asset/inline",
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
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ["**/*", "!index.html"],
            cleanAfterEveryBuildPatterns: ["!index.html"],
        }),
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
        new FaviconsWebpackPlugin("./src/assets/app.ico"),
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
        port: 8888,
        //自动打开浏览器
        open: true,
        hot: true,
        writeToDisk: true,
    },
};
