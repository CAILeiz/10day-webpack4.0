let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let  miniCssExtractPlugin = require("mini-css-extract-plugin")
let UglifyjsPlugin = require("uglifyjs-webpack-plugin"); // webpack默认使用这个压缩js
let OptimizeCss = require("optimize-css-assets-webpack-plugin"); // 用来压缩css代码
module.exports = {
    optimization: {
        minimizer: [
            new UglifyjsPlugin({
                cache: true, // 是否使用缓存
                parallel: true, // 是否并发打包js 一起压缩多个
                sourceMap: true // es6转换为es5 源码映射
            }),
            new OptimizeCss() // 如果只配置这个 不会压缩js代码
        ]
    },
    devServer: { 
        port: 3000, 
        progress: true, 
        contentBase: "./build", 
        open: true, 
        compress: true, 
    },
    mode: "production", 
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash:8].js", 
        path: path.resolve(__dirname, "build") 
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html", 
            minify: { 
                removeAttributeQuotes: true, 
                collapseWhitespace: true, 
            },
            hash: true, 
        }),
        new miniCssExtractPlugin({
            filename: "main.css" // 放到当前./build下的main.css文件中
        }) 
    ],
    module: { 
        rules: [ 
            
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader, // 使用link引入
                    "css-loader",
                    "postcss-loader"
                ]
            },
            {
                test: /\.less$/,
                use: [
                    miniCssExtractPlugin.loader,
                    "css-loader",
                    "postcss-loader",
                    "less-loader"
                ]
            }
        ]
    }
}