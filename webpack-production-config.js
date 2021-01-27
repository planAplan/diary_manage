//0.引入path模块解决路径问题
const { resolve } = require("path");
//1.引入插件提取和兼容性处理css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//2.引入压缩css插件
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
//3.引入处理html图片引入的插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

//每次打包前清除打包目录
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
//处理ico图标
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");

//复用loader
const commonCssLoader = [
    //这一行作用为将css文件抽离出来
    MiniCssExtractPlugin.loader,
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

//package.json中的browserslist默认使用开发环境，若使用生产环境需要定义nodejs环境变量
process.env.NODE_ENV = "production";

module.exports = {
    entry: "./src/js/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname, "dist"),
    },
    module: {
        rules: [
            //1.处理css文件
            {
                test: /\.css$/,
                //通过扩展运算符使用封装的loader
                use: [...commonCssLoader],
            },
            //2.处理less文件
            {
                test: /\.s(a|c)ss$/,
                //由于use数组执行顺序为从下往上(注意执行顺序)，经过less-loader转换为css后再进行兼容性处理
                use: [...commonCssLoader, "sass-loader"],
            },
            /**
             * 正常来说：一个文件只能被一个loader处理
             * 当一个文件要被多个loader处理时，那么一定要指定loader的执行顺序。
             * 比如先执行eslint-loader，再执行babel-loader。这是因为一旦语法出错进行兼容性处理就没意义了。
             * 如何添加顺序：enforce: 'pre'
             */

            //3.进行语法检查
            {
                //在package.json中配置eslintConfig指定检查规则 --> airbnb
                test: /\.js$/,
                //配出不需要语法检查的文件
                exclude: /node_modules/,
                //优先执行
                enforce: "pre",
                loader: "eslint-loader",
                options: {
                    //自动修复错误
                    fix: true,
                },
            },
            //4.js兼容性处理
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    //添加预设，告诉babel以哪种方式进行兼容性处理
                    presets: [
                        //由于要使用方法一和三，所以使用数组保存
                        [
                            //简单处理
                            "@babel/preset-env",
                            //按需加载
                            {
                                useBuiltIns: "usage",
                                //指定corejs版本
                                corejs: { version: 3 },
                                //指定浏览器版本
                                targets: {
                                    chrome: "60",
                                    firefox: "50",
                                },
                            },
                        ],
                    ],
                },
            },
            //5.处理图片
            {
                test: /\.(jpe?g|gif|png|svg)$/,
                loader: "url-loader",
                options: {
                    //通过base64编码优化
                    limit: 8 * 1024,
                    //重命名打包后的图片
                    name: "[hash:10].[ext]",
                    //指定输出路径
                    outputPath: "imgs",
                },
            },
            //6.处理html中的图片
            {
                test: /\.html$/,
                loader: "html-loader",
            },
            //8.处理其他文件
            // {
            //     //排除其他文件
            //     //正则中不加$表示只要匹配到这些词就行，是不是后缀都可以
            //     exclude: /\.(js|css|less|html|jpg|png|gif)/,
            //     //原封不动地输出文件
            //     loader: "file-loader",
            //     options: {
            //         outputPath: "media",
            //     },
            // },
        ],
    },
    plugins: [
        //兼容性处理css并单独抽离css文件
        new MiniCssExtractPlugin({
            //设置输出路径
            filename: "css/built.css",
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            //指定html模板
            template: "./src/index.html",
            //7.压缩html文件
            minify: {
                //移除空格
                collapseWhitespace: true,
                //移除注释
                removeComments: true,
            },
        }),
        new CleanWebpackPlugin(),
        new FaviconsWebpackPlugin("./src/app.ico"),
    ],
    //改为production模式自动压缩js文件
    mode: "production",
};
