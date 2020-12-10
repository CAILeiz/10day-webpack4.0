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
