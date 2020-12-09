// webpack 是node写出来的 所以写的时候使用node的写法
let path = require("path");
let HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    devServer: { // webpack-dev-server 内存中的服务器 默认打开的是根目录
        port: 3000, // 服务器端口号
        progress: true, // 显示打包的进度条
        contentBase: "./build", // 默认打开的是内存中的根目录
        open: true, // 是否默认打开浏览器
        compress: true, // 启用直接微压缩
    },
    mode: "production", // 模式默认两种 development production(设置默认这个)
    entry: "./src/index.js",
    output: {
        filename: "bundle.[hash:8].js", // 打包后的文件名 中间可以加一个hash 文件修改后打包的时候防止出现缓存的问题
        path: path.resolve(__dirname, "build") // 路径必须是一个绝对路径 所以采用path.resolve()
    },
    plugins: [ // 数组 放着所有的webpack插件
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html", // 设置打包后的文件也叫index.html 打包之后这个html会自动引入该目录的js文件
            minify: { // 压缩方法比如去双引号啊啥的
                removeAttributeQuotes: true, // 删除html文件中的双引号
                collapseWhitespace: true, // 把文件弄成一行
            },
            hash: true, // 希望引用js的时候有一个hash戳 此时bundle.js后面还会加 ? hash值 ******解决缓存的问题
        }) 
    ],
    module: { // 模块
        rules: [ // 规则 css-loader 处理@import这种语法
            // style-loader 他是把css插入到head标签中
            // loader的特点: 希望单一
            // loader的用法 字符串只用一个loader
            // 多个loader需要[]
            // loader的顺序 默认是从右向左执行 从下到上执行
            // loader还可以写成 对象方式 为了配置options
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    "css-loader"
                ]
            },
            // 可以处理less文件 less less-loader 
            // sass node-sass sass-loader
            // stylus stylus-loader
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "less-loader"
                ]
            }

        ]
    }
}