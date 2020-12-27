## 实现plugin

## webpack中的Plugin
webpack通过 plugins 实现各种功能。
开发者可以通过插件引入它们自己的行为到webpack构建流程中。
但是需要理解一些webpack底层的内部特性来做相应的钩子


## 加载插件的对象
compiler编译对象 
1. 开始运行
2. compile开始编译
3. compilation 创建编译对象
4. make 创建模块对象
5. emit 发射文件
6. done完成
compilation 资源构建
1. buildModule 创建模块
2. normalModuleLoader 普通模块加载
3. successModule模块加载完成
4. finishModule模块加载完成
5. seal 封装整理代码
6. optimize优化
7. after-seal封装后
Module Factory模块处理
1. beforeResolver解析前
2. afterResolver解析后
3. parse 解析
Module模块
Parse解析 (AST语法树)
1. program 开始遍历
2. statement语句
3. call调用
4. expression 处理表达式
Template模板
1. hash处理hash
2. bootstrap启动
3. localVars 变量
4. render渲染
******  [重点]
[在插件开发中最重要的两个资源就是compiler和compilation对象。]
[compiler对象代表了完整的webpack环境配置。]
[compilation对象代表了一次资源版本构建。]


## webpack中的插件
1. webpack/lib/Compiler.js中 实例上有hooks钩子属性 
2. 根目录创建plugins文件夹 创建DonePlugin.js[提示完成插件]和AsyncPlugin[异步提示发射文件]
a) DonePlugin.js文件内容
class DonePlugin {
    apply(compiler) {
        console.log(1);
        compiler.hooks.done.tap("DonePlugin", (stats) => {
            console.log("编译完成");
        })
    }
}
module.exports = DonePlugin;
b) AsyncPlugin.js文件内容
const { rejects } = require("assert");
const { resolve } = require("path");
class AsyncPlugin {
    apply(compiler) {
        console.log(2);
        // 使用tapAsync异步
        compiler.hooks.emit.tapAsync("AsyncPlugin", (compliation, cb) => {
            setTimeout(() => {
                console.log("文件发射出来 等一下")
            }, 1000);
        })
        // 使用tapPromise异步
        compiler.hooks.emit.tapPromise("AsyncPlugin", (compliation) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log("再等一秒");
                    resolve();
                }, 1000);
            })
        })
    }
}
module.exports = AsyncPlugin;
3. 在webpack.config.js中引入这两个插件并在plugins中配置
let path = require("path");
const DonePlugin = require("./plugins/DonePlugin")
const AsyncPlugin = require("./plugins/AsyncPlugin")
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new DonePlugin(),
        new AsyncPlugin()
    ]
}
4. 控制台执行npx webpack结果为
1 
2
文件发射出来 等一下



## 文件列表插件 功能在打包的dist目录下生成一个文件 里面是资源名称和大小的集合
1. webpack.config.js文件配置
let path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const FileListPlugin = require("./plugins/FileListPlugin.js")
module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist")
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "home.html"
        }),
        new FileListPlugin({
            filename: "list.md"
        })
    ]
}
2. 在plugins下创建FileListPlugin.js文件
class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename
    }
    apply(compiler) {
        // 调用webpack中的emit钩子
        // 文件已经准备好了 要进行发射的时候调用
        compiler.hooks.emit.tap("FileListPlugin", (compliation) => {
            console.log(compliation.assets);
            let assets = compliation.assets;
            let content = `## 文件名      资源大小\r\n`;
            // [[bundle.js, {}], [home.html, {}]]
            Object.entries(assets).forEach(([filename, statObj]) => {
                content += `--${filename}    ${statObj.size()}\r\n`;
            })
            // 资源对象增加一个文件
            assets[this.filename] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            }
        })
    }
}
module.exports = FileListPlugin
[compliation.assets 对象详情]
{
  'bundle.js': CachedSource {
    _source: ConcatSource { _children: [Array], _isOptimized: false },
    _cachedSourceType: undefined,
    _cachedSource: undefined,
    _cachedBuffer: undefined,
    _cachedSize: undefined,
    _cachedMaps: Map {},
    _cachedHashUpdate: undefined
  },
  'home.html': { source: [Function: source], size: [Function: size] }
}
3. webpack之后执行结果
dist文件夹下面多一个list.md文件
文件内容为: 
## 文件名      资源大小
--bundle.js    769
--home.html    248



## 内联webpack插件 功能: 将打包之后的link css文件和script src的js文件 全部内联到html中 形成一个文件


