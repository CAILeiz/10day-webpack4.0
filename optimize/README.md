## webpack优化篇

## noParse优化
当我们引入一个jQuery模块的时候我们会去加载jQuery,分析jQuery有没有依赖,再去打包,
因为一般jQuery一般没有其他模块依赖 我们不想让webpack去解析
noParse: /jquery/,  不去解析jQuery中的依赖关系
优化时间 从 5785ms 降到 5168ms

## ignore配置 
1. 主要正对于js的解析
exclude: /node_modules/,  排除node_modules
时间从5168ms 降到了2755ms
include: path.resolve(__dirname, "src")
时间从2755ms 降到了 2504ms
2. 只使用到一个模块的一小部分 不全部引入
使用webpack.IgnorePlugin 忽略
在index.js 中
import moment from "moment";
let r = moment().endOf("day").fromNow()
console.log(r)
new webpack.IgnorePlugin(/\.\/locale/, /moment/)
bundle.js文件大小从1.4mb 降到了870 KiB 


## 动态连接库
是什么? 怎么使用? 解决什么问题?
1. 在打包大的第三方文件的时候 先把这些文件打包到一个文件中 通过output.library 和output.libraryTarget导出文件中的内容 让index.html可以使用
还需要配置一个对应的关系json文件 使用webpack.DllPlugin 里面配置的name需要和library名称一致 会输出一个json模块的对应关系
module.exports = {
    mode: "development",
        entry: {
        react: ["react", "react-dom"]
    },
    output: {
        filename: "_dll_[name].js", // 产生的文件名 把当前打包输出的文件定义成一个动态连接库 需要有一个清单可以找到这个文件中的所有模块
        path: path.resolve(__dirname, "dist"),
        library: "_dll_[name]", // 给打包好的文件定义导出
        libraryTarget: "var" // 给打包好的文件定义导出的语法 "var"(默认) | "assign" | "this" | "window" | "self" | "global" | "commonjs" | "commonjs2" | "commonjs-module" | "amd" | "amd-require" | "umd" | "umd2" | "jsonp" | "system"
    },
    plugins: [
        new webpack.DllPlugin({ // 这里面配置的name需要和library名称一致 会输出一个json模块的对应关系
            name: "_dll_[name]",
            path: path.resolve(__dirname, "dist", "manifest.json")
        })
    ]
}
2. 此时index.js中的
import React from "react";
import { render } from "react-dom";
还是会去找React和react-dom打包 
3. 需要在原始文件中配置 作用:
在引入模块之后系统会先去查找manifest.json这个清单 找不到再去打包node_modules中的模块 
 new webpack.DllReferencePlugin({
    manifest: path.resolve(__dirname, "dist", "manifest.json") // 先去查找manifest.json这个清单 找不到再去打包模块
})
4. 在需要打包的index.html文件中script引入文件
<script src="/_dll_react.js"></script> 
性能: 
Time: 1453ms ********
Built at: 2020-12-12 11:59:25
     Asset       Size  Chunks             Chunk Names
 bundle.js   6.38 KiB    main  [emitted]  main   ********
index.html  370 bytes          [emitted]   ********


## happypack 可以使用多线程打包
1. 引入Happypack
let Happypack = require("happypack");
2. 使用 在rules的中use中先替换之前的loader及options Happypack/loader?id=js id为使用的模块
{
    test: /\.less$/,
    use: "Happypack/loader?id=css"
},
{
    test: /\.js$/,
    use: "Happypack/loader?id=js", // 给happypack指定打包的类型 id为js的模块
    exclude: /node_modules/,
    include: path.resolve(__dirname, "src")
}
3. 在plugins中根据命名的id写入不同的打包模块即可启动多线程打包
new Happypack({
    id: "js",
    use: [
        {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", "@babel/preset-react"]
            }
        }
    ]
}),
new Happypack({
    id: "css",
    use: [
        "style-loader",
        "css-loader",
        "less-loader"
    ]
})
4. npm run build 
Happy[js]: Version: 5.0.1. Threads: 3
Happy[js]: All set; signaling webpack to proceed.
Happy[css]: Version: 5.0.1. Threads: 3
Happy[css]: All set; signaling webpack to proceed.
Hash: c3a5257b24b5364315d7
Version: webpack 4.44.2
Time: 3438ms
5. 注意事项 如果项目比较小 启动线程也需要时间 所以小项目启动线程打包会让打包时间边长
