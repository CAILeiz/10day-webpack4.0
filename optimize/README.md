## webpack优化篇

## noParse优化
当我们引入一个jQuery模块的时候我们会去加载jQuery,分析jQuery有没有依赖,再去打包,
因为一般jQuery一般没有其他模块依赖 我们不想让webpack去解析
在module中跟rules同级中配置
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


## webpack 自带优化
1. tree-shaking
在生产模式中 import 会自动去除没用的代码 require不会这样做
es模块 会把打包结果放到default中
let calc = require("./react.js");
console.log(calc.default.sum(1, 2 ));
2. scope hosting 作用域提升
let a  = 1;
let b  = 1;
let c  = 1;
let d  = a + b + c; 在webpack中自动省略a b c 直接输出3 可以简化代码
console.log(d);


## 抽离公共代码(多页面打包抽离公共代码)
背景: 
index.js 文件内容
import "./a"
import "./b"
import jquery from  "jquery";
console.log("index.js");

other.js 文件内容
import "./a"
import "./b"
import jquery from  "jquery";
console.log("other.js");
他两都用到了a和b文件 还有jquery第三方模块
我们需要分别抽离出来
1. 抽离公共引入的文件
2. 抽离第三方模块
optimization: {
    splitChunks: { // 分割代码块   *************** 之前使用的是commonChunkPlugins插件 现在webpack4.0使用的是splitChunks
        cacheGroups: { // 缓存组
            common: { // 公共的模块
                chunks: "initial",  // 从入口处开始就要提取代码了
                minSize: 0, // 0个字节被公用就会抽取出来
                minChunks: 2 // 公用的大于这个次数就会被抽取出来
            }
            vendor: { // 抽离第三方模块
                priority: 1, // 优先级
                test: /node_modules/,  // 把公共用到的node_modules模块抽离出来
                chunks: "initial",  // 从入口处开始就要提取代码了
                minSize: 0, // 0个字节被公用就会抽取出来
                minChunks: 2
            }
        }
    }
}
3. 打包出来的文件目录
dist


## 懒加载 原理 es6 草案的语法 jsonp实现动态加载文件
(window.webpackJsonp=window.webpackJsonp||[]).push([[1],[,function(n,w,o){"use strict";o.r(w),w.default="懒加载"}]]);
let btn = document.createElement("button");
btn.innerHTML = "懒加载";
路由懒加载 vue或者react都是用的import().then()
btn.addEventListener("click", _ => {
    console.log("click");
    import("./source.js").then( data => {
        console.log(data.default);
    })
})
document.body.appendChild(btn)

## 热更新
1. 先在开发服务上面配置一个hot: true
2. 配置webpack.HotModuleReplacementPlugin() 热更新的插件
        new webpack.NamedModulesPlugin(),
3. 配置webpack.NamedModulesPlugin()插件
可以输出module 这里面有hot对象 里面有accept属性可以 接受哪个文件发生改变之后执行什么操作

