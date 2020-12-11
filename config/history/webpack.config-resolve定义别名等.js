let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        home: "./src/index.js"
    },
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "dist")
    },
    resolve: { // 解析第三方包
        modules: [path.resolve("node_modules")],
        alias: { // 别名 vue vue.runtime
            bootstrap: "bootstrap/dist/css/bootstrap.css"
        },
        extensions: ['.js','.css', '.json'] // 找拓展名 先找js 再找 css 再找 json
        // mainFields: ["style", "main"], // 在node_modules下面的packjson中先找style 再找main
        // mainFiles: [] // 入口文件的名字 index.js
    },
    devServer: {
        // 1)
        // proxy: { // 重写的方式把请求代理到express服务器上
        //     "/api": {
        //         target: "http://localhost:3000",
        //         pathRewrite: {
        //             "api": ""
        //         }
        //     } // 配置了代理
        // }
        // 2) 我们前端只想来模拟数据
        // before(app) {
        //     app.get("/user", (req, res) => {
        //         res.json({name: "大雷子-before"})
        //     })
        // }
        // 3) 有服务端 不能用代理来处理 能不能在服务端启动webpack 端口用服务端端口 就不存在跨域问题了
        // 使用webpack-dev-middleware中间件,
        // contentBase: "./dist"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "index.html",
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', "css-loader"]
            },
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    }
}