## 多页面入口
output: {
    // [name] 表示 home,other
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
}


## 打包到不同的html文件中 需要用到chunks
plugins: [
    new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "home.html",
        chunks: ['home'] // 放的代码块
    }),
    new HtmlWebpackPlugin({
        template: "./index.html",
        filename: "other.html",
        chunks: ['other', "home"]
    })
]

## 配置source-map(babel会把高级语法转为低级语法, source-map)
1) devtool: "source-map" 增加映射文件 可以帮我们调试源代码源码映射, 会单独生成一个sourcemap文件 出错了 会标识报错的列和行 *****大和全
2) devtool: "eval-source-map" 不会产生单独的文件 可以显示行和列
3) devtool: "cheap-module-source-map" 不会产生列 但是是一个单独的映射文件 产生后你可以保留起来调试  **** 不常用
4) devtool: "cheap-module-eval-source-map"  不会生成文件 集成在打包后的文件中 不会产生列 但是会指示出错的位置


## watch参数 实时观测代码改变 重新打包
watch: true,
watchOptions: { // 监控的选项
    poll: 1000, // 每秒问我1000次
    aggregateTimeout: 500, // 防抖
    ignored: /node_modules/ // 不需要进行监控的文件
}

## webpack 小插件应用    
1) cleanWebpackPlugin 
new CleanWebpackPlugin("./dist"), 如果想要清除多个文件夹的目录可以传入一个数组 如果是一个的话只需要传入一个路径文件夹
2) copyWebpackPlugin 现在使用的版本是@1.1.1
new CopyWebpackPlugin([ 拷贝插件
    {from: "./doc", to: "./"}
])
3) bannerPlugin 这个是webpack内置的 版权声明插件 在打包出来的js头部声明一下自己的版权
new webpack.BannerPlugin("make 2020 by dalei")

## webpack跨域问题
1)
proxy: { 重写的方式把请求代理到express服务器上
    "/api": {
        target: "http:ocalhost:3000",
        pathRewrite: {
            "api": ""
        }
    } 配置了代理
}
2) 我们前端只想来模拟数据
before(app) {
    app.get("/user", (req, res) => {
        res.json({name: "大雷子-before"})
    })
}
3) 有服务端 不能用代理来处理 能不能在服务端启动webpack 端口用服务端端口 就不存在跨域问题了
使用webpack-dev-middleware中间件
const express = require("express");
let app = express();
let webpack = require("webpack");
let middle = require("webpack-dev-middleware");
let config = require("./webpack.config");
let compiler = webpack(config);
app.use(middle(compiler)); // 中间件
app.get("/api/user", middle, (req, res) => {
    res.json({name: "大雷子"})
})
app.listen(3000);


## resolve属性的配置 
commonJs 找文件的原理默认从node_module中找,然后一直往上找
resolve: { // 解析第三方包
    modules: [path.resolve("node_modules")], // 规定找模块的地方 指定在当前路径的node_modules下面找
    alias: { // 别名 vue vue.runtime
        bootstrap: "bootstrap/dist/css/bootstrap.css"
    },
    extension: ['.js','.css', '.json'] // 找拓展名 先找js 再找 css 再找 json
    // mainFields: ["style", "main"], // 在node_modules下面的packjson中先找style 再找main
    // mainFiles: [] // 入口文件的名字 index.js
}


## 定义环境变量
new webpack.DefinePlugin({
    "DEV": JSON.stringify("production"), // 相当于console.log('production')
    "FLAG": "true", // 相当于输出 true
    "EXPRESSION": "1+1" // console.log(2)
})
console.log(DEV);
console.log(typeof FLAG);
console.log(EXPRESSION);
输出production boolean 2

## 区分不同的环境
根据环境变量的不同 使用webpack-merge中的merge属性合并
创建两个不同的环境webpack.js文件  合并webpack.base.js
webpack.dev.js 
webpack.prod.js
 






