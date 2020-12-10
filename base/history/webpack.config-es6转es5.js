let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
let  miniCssExtractPlugin = require("mini-css-extract-plugin")
let UglifyjsPlugin = require("uglifyjs-webpack-plugin"); 
let OptimizeCss = require("optimize-css-assets-webpack-plugin"); 
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
        open: true, 
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
            minify: { 
                removeAttributeQuotes: true, 
                collapseWhitespace: true, 
            },
            hash: true, 
        }),
        new miniCssExtractPlugin({
            filename: "main.css" 
        }) 
    ],
    module: { 
        rules: [ 
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                        // 以下处理的是提案的语法
                        plugins: [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose": true }]
                        ]
                    }
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