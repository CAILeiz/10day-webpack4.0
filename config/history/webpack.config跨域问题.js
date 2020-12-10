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
        // 使用webpack-dev-middleware中间件
        

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./index.html",
            filename: "home.html",
        })
    ],
    module: {
        rules: [
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