let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let webpack = require("webpack");
module.exports = {
    optimization: {
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                common: { // 公共的模块
                    chunks: "initial",  // 从入口处开始就要提取代码了
                    minSize: 0, // 0个字节被公用就会抽取出来
                    minChunks: 2 // 公用的大于这个次数就会被抽取出来
                },
                vendor: { // 抽离第三方模块
                    priority: 1, // 优先级
                    test: /node_modules/,  // 把公共用到的node_modules模块抽离出来
                    chunks: "initial",  // 从入口处开始就要提取代码了
                    minSize: 0, // 0个字节被公用就会抽取出来
                    minChunks: 2
                }
            }
        }
    },
    mode: "production",
    entry: {
        index: "./src/index.js",
        other: "./src/other.js",
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./public/index.html"
        }),
        new webpack.IgnorePlugin(/\.\/locale/, /moment/),
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, "dist", "manifest.json") // 先去查找manifest.json这个清单 找不到再去打包模块
        // })
    ],
    devServer: {
        port: 3000,
        compress: true,
        contentBase: "./dist" // 找不到会找内存中的
    },
    module: {
        noParse: /jquery/, // 不去解析jQuery中的依赖关系
        rules: [
            {
                test: /\.less$/,
                use:  [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"]
                    }
                }, 
                exclude: /node_modules/,
                include: path.resolve(__dirname, "src")
            }
        ]
    }
}