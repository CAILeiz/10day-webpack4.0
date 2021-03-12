## 什么是loader
webpack只能处理javaScript的模块,如果要要处理其他类型的文件; 需要使用loader进行转换;
loader是webpack中一个重要的概念,它是指用来将一段代码转换成另一段代码的webpack加载器

## 手写loader loader就是一个函数参数有是匹配到文件的内容 返回结果会作为最新的内容
## 自己写的loader三种调用方式
1. 使用绝对路径
{
    test: /\.js$/,
    use: path.resolve(__dirname, "loaderxxx")
}
2. 使用resolveLoader中的alias(别名)
resolveLoader: { 
    // modules: ["node_modules", path.resolve(__dirname, "loaders")],
    alias: {  // 别名
        loader1: path.resolve(__dirname, "loaders", "loader1.js") 
    }
}
3. 使用resolveLoader中的modules(从左到右找)
resolveLoader: { 
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
}

## 针对同一后缀名的文件解析配置多个loader 
1. 第一种方式 解析的顺序问题 从右向左
{
    test: /\.js$/,
    use: ["loader1", "loader2", "loader3"]
}
2. 第二种方式 从下到上
{
    test: /\.js$/,
    use: "loader1"
},
{
    test: /\.js$/,
    use: "loader2"
},
{
    test: /\.js$/,
    use: "loader3"
}
3. 可以加enforce: 属性值有pre/normal/post 
执行顺序为pre --> normal(默认) --> post 

## loader执行的原理
loader默认是由两部分组成的 pitch normal
pitch是倒着来的 normal是webpack执行loader的顺序
eg: use["loader1", "loader2", "loader3"]
执行顺序为
loader1-pitch loader2-pitch loader3-pitch loader3 loader2 loader1 
如果在编译的loader函数的属性pitch的函数内返回一个"xxx" 会终止后面[特定]的normal函数
eg:
在loader2中尝试
loader.pitch = function () {
    console.log("loader2-pitch");
    return "111"
}
npx webpack 编译结果为
loader3-pitch
loader2-pitch
loader3~~~

## loader的特点
第一个loader[解析的最后一个loader]要返回js脚本 ==> 因为在bundle.js中是eval执行的 所以最后编译的时候要返回一个js脚本 return 1会报错
每个loader只做一件内容,为了使loader在更多场景链式调用每一个loader都是一个模块
每个loader都是无状态的,确保loader在不同模块转换之间不保存状态。 ==> 不能加if(flag) ...



## 实现babel-loader 
1. 在webpack中配置
devtool: "source-map",
{
    test: /\.js$/,
    use: {
        loader: path.resolve(__dirname, "loaders", "babel-loader.js"),
        options: {
            presets: ["@babel/preset-env"]
        }
    },
    include: path.resolve(__dirname, "src"),
}
2. 在loaders中创建babel-loader.js文件
const babel = require("@babel/core");
let loaderUtils = require("loader-utils")
function loader(source) {
    console.log(Object.keys(this));
    let options = loaderUtils.getOptions(this);
    console.log(options); // { presets: [ '@babel/preset-env' ] } 
    let cb = this.async();
    // 第一个参数是将要转换的源码 source
    // 第二个参数是一个Object 里面有根据什么转换 options是{ presets: [ '@babel/preset-env' ] } 
    // 第三个参数是回调函数 这个函数是异步返回的 所以需要引入cb 里面是cb cb第一个参数是err 第二个是转换成功的代码 第三个是输出map文件
    babel.transform(source, {
        ...options, // 为了解析出presets 预设
        sourceMaps: true, // 配置完map
        filename: this.resourcePath.split("/").pop() // 设置文件名
    }, function(err, result) {
        // cb第一个参数如果随便填值会被认为是一个错误
        // cb(err, result.code, result.map) // 异步
        cb(err, result.code) // 异步
    })
    // return source;
}
module.exports = loader;
3. webpack 结果
会有两个文件 一个bundle.js 文件 一个bundle.js.map文件


## 实现给js内容加注释的banner-loader
1. 功能 检测js文件 给js文件内容加自定义前缀 options有text和filename模板 --- 如果有filename用末班文件中内容作为js内容注释前缀 否则用text内容做前缀
2. webpack 配置
{
    test: /\.js/,
    use: {
        loader: "banner-loader", // 在js文件前面加一个注释
        options: {
            text: "dalei",
            filename: path.resolve(__dirname, "banner.js")
        }
    }
}
3. 在根目录中创建banner.js文件
4. 在loaders文件夹中创建banner-loader文件
~~~js
使用loader-utils模块工艺区带webpack.config.js文件中的配置上下文 获取到options用来取到filename和text用来加前缀
其中使用 this.cacheable && this.cacheable(true) 来设置是否开启缓存 默认开启缓存
使用 schema-utils 中的validate(schema, options)
schema为检测的语法规则
const {validate} = require("schma-utils")
let options = loaderUtils.getOptions(this);
 let schema = {
    type: "object",
    properties: {
        text: {
            type: "string"
        },
        filename: {
            type: "string"
        }
    }
}
validate(schema, options)
schema: Schema,
options: Array<object> | object, 
configuration?: ValidationErrorConfiguration | undefined
~~~
 
## 实现file-loader及url-loader
1. file-loader 
a) webpack.config.js配置loader
{
    test: /\.jpg$/,
    // 目的是根据图片生成一个md5戳 发射到dist目录下 file-loader还会返回当前的图片路径
    use: "file-loader"
}
b) index.js入口文件引入图片
import p from "./public.jpg" ------ p是图片路径
let img = document.createElement("img");
img.src = p;
document.body.appendChild(img)
c) file-loader.js
let loaderUtils = require("loader-utils");
function loader(source) {
    // file-loader 需要返回一个路径
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
        content: source
    })
    console.log(source);
    console.log(filename);
    this.emitFile(filename, source); // 发射文件
    return `module.exports = "${filename}"`
}
loader.raw = true;
module.exports = loader;

2. url-loader
a) webpack.config.js配置loader
 {
    test: /\.jpg$/,
    // url-loader 1. 交给file-loader处理路径发射文件
    //            2. 有选项 大于limit 生成图片 反之生成base64
    use: {
        loader: "url-loader-my",
        options: {
            limit: 200 * 1024 // 200kb
        }
    }
}
b) index.js入口文件引入图片
c) url-loader-my.js
let loaderUtils = require("loader-utils");
let mime = require("mime");
function loader(source) {
    console.log(mime.getType(this.resourcePath));
    let { limit } = loaderUtils.getOptions(this);
    if(limit && limit > source.length) {
        console.log(`"data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`);
        return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require("./file-loader").call(this, source);
    }
}
loader.raw = true; // 将字符串转为buffer对象
module.exports = loader;


## 实现style-loader css-loader less-loader解析less文件
1. webpack.config.js配置
{
    test: /.less$/,
    use: ['style-loader', 'css-loader', 'less-loader']
}
2. 创建index.less文件 并在入口文件中require
3. 在loaders中创建这三个loader.js文件
a) less-loader文件转换 使用的是less的render方法 回调成功之后res.css就是解析出来的css
let less = require("less");
function loader(source) {
    let css;
    less.render(source, function(err, r) {
        css = r.css;
    })
    return css;
}
module.exports = loader;
b) css-loader
// style-loader 主要处理的是background里面的url 把url分成三部分 中间的url("xxx") 转换成 url(require('xxx')) 最后一部分是其他的css
function loader(source) {
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = ["let list = []"];
    while(current = reg.exec(source)) { // exec返回的是一个数组 第一个值是匹配到的内容url("xxx") 第二个值是()里面的内容 "xxx"
        let [matchUrl, g] = current;
        console.log(current);
        console.log(matchUrl, g);
        let last = reg.lastIndex - matchUrl.length; // reg.lastIndex匹配到的值的最后一位的下标 减去matchUrl的长度就是url前面的css代码
        console.log(reg.lastIndex);
        arr.push(`list.push(${JSON.stringify(source.slice(pos, last))})`); // 匹配到url后面的css代码
        pos = reg.lastIndex;
        // 把g替换成require的写法 ==> url(require("xxx"))
        arr.push(`list.push('url(' + require(${g})+')')`);
    }
    arr.push(`list.push(${JSON.stringify(source.slice(pos))})`);
    arr.push(`module.exports = list.join('')`);
    console.log("arr", arr);
    return arr.join('\r\n');
}
module.exports = loader;
exec匹配到的current 值为
[
    'url("./1.jpg")',
    '"./1.jpg"',
    index: 40,
    input: 'body {\n  background: red;\n  background: url("./1.jpg");\n}\n',
    groups: undefined
]
arr 值为
[
    'let list = []',
    'list.push("body {\\n  background: red;\\n  background: ")',
    `list.push('url(' + require("./1.jpg")+')')`,
    'list.push(";\\n}\\n")',
    "module.exports = list.join('')"
]
c) style-loader解析 返回一个脚本 让eval执行
let loaderUtils = require("loader-utils");
function loader(source) {
    // 我们可以在style-loader中导出一个脚本
    let str = `
        let style = document.createElement('style');
        style.innerHTML = ${JSON.stringify(source)};
        document.head.appendChild(style);
    `
    return str;
}
// 在style-loader上写了pitch
// style-loader less-loader!css-loader!./index.less
loader.pitch = function(remainingRequest) { // 剩余请求
    // 让style-loader 去处理less-loader!css-loader/./index.less
    // require路径 返回的就是css-loader处理好的结果 require ('!!css-loader!less-loader!index.less')
    let str = `
        let style = document.createElement('style');
        style.innerHTML = require(${loaderUtils.stringifyRequest(this, '!!' + remainingRequest)});
        document.head.appendChild(style);
    `
    return str;
}
module.exports = loader;
// style = 'body{\r\n background: red}'