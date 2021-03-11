let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let miniCssExtractPlugin = require("mini-css-extract-plugin")
let UglifyjsPlugin = require("uglifyjs-webpack-plugin"); 
let OptimizeCss = require("optimize-css-assets-webpack-plugin"); 
let webpack = require("webpack");
module.exports = {
    optimization: {
        minimizer: [
            new UglifyjsPlugin({
                cache: true, 
                parallel: true, 
                sourceMap: true 
            }),
            new OptimizeCss() 
        ]
    },
    devServer: { 
        port: 3000, 
        progress: true, 
        contentBase: "./build", 
        // open: true, 
        compress: true, 
    },
    mode: "development",  
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash:8].js", 
        path: path.resolve(__dirname, "build") 
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html", 
            // minify: { 
            //     removeAttributeQuotes: true, 
            //     collapseWhitespace: true, 
            // },
            hash: true, 
        }),
        new miniCssExtractPlugin({ // css less类似文件打包分类到css文件夹下面
            filename: "main.css" 
        }),
        new webpack.ProvidePlugin({
            $: "jquery"
        }) 
    ],
    externals: {
        jquery: "$"
    },
    module: { 
        rules: [ 
            {
                test: /\.html$/,
                use: "html-withimg-loader"
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: {
                    // 做一个限制 当我们的图片小于多少的时候 用base64来转换 大于的话使用file-loader将这张图片产出
                    // base64 会比之前的图片大三分之一
                    loader: "url-loader",
                    options: {
                        limit: 200 * 1024
                    }
                }
            },
            {
                use: [
                    {
                        loader: "babel-loader",
                        options: ["@babel/preset-env"],
                        includes: path.resolve(__dirname, "src"),
                        exclude: /node_modules/
                    },
                    {
                        loader: "eslint-loader"
                    }
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader", // normal
                    options: {
                        presets: ["@babel/preset-env"],
                        // 以下处理的是提案的语法
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            "@babel/plugin-transform-runtime" // 处理includes runtime
                        ],
                        include: path.resolve(__dirname, "src"),
                        exclude: /node_modules/
                    },
                }
            },
            {
                test: /\.css$/,
                use: [
                    miniCssExtractPlugin.loader, 
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