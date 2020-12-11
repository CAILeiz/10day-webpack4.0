let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin"); // 用模板生成html,自动帮我们把js引入进去
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
        path: path.resolve(__dirname, "build"),
        // publicPath: "http://www.dalei.cn"  // 在所以引用打包的资源前面加公共路径
    },
    plugins: [ 
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html", 
            hash: true, 
        }),
        new miniCssExtractPlugin({
            filename: "css/main.css" 
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
                    loader: "url-loader",
                    options: {
                        limit: 1,
                        outputPath: "img/",
                        esModule: false
                        // publicPath: "http://www.dalei.com" 
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader", 
                    options: {
                        presets: ["@babel/preset-env"],
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }],
                            "@babel/plugin-transform-runtime" 
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