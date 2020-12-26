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
2. 使用provideLoader中的alias(别名)
resolveLoader: { 
    // modules: ["node_modules", path.resolve(__dirname, "loaders")],
    alias: {  // 别名
        loader1: path.resolve(__dirname, "loaders", "loader1.js") 
    }
}
3. 使用provideLoader中的modules(从左到右找)
resolveLoader: { 
    modules: ["node_modules", path.resolve(__dirname, "loaders")]
}

## 针对同一个文件解析test配置多个loader 
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
如果在编译的loader函数的属性pitch的函数内返回一个"xxx"
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
第一个loader要返回js脚本 ==> 因为在bundle.js中是eval执行的 所以最后编译的时候要返回一个js脚本 return 1会报错
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
        ...options,
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
使用loader-utils模块工艺区带webpack.config.js文件中的配置上下文 获取到options用来取到filename和text用来加前缀
其中使用 this.cacheable && this.cacheable(true) 来设置是否开启缓存 默认开启缓存
使用 schema-utils 中的validate(schema, options, configuration)
schema为检测的语法规则
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
schema: Schema,
options: Array<object> | object, 
configuration?: ValidationErrorConfiguration | undefined



## 实现file-loader及url-loader
