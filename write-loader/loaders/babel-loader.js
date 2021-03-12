const babel = require("@babel/core");
let loaderUtils = require("loader-utils")
function loader(source) {
    // 输出this
    // console.log(Object.keys(this));
    let options = loaderUtils.getOptions(this);
    console.log(options); // { presets: [ '@babel/preset-env' ] } 
    let cb = this.async();
    // 第一个参数是将要转换的源码 source
    // 第二个参数是一个Object 里面有根据什么转换 options是{ presets: [ '@babel/preset-env' ] } 
    // 第三个参数是回调函数 这个函数是异步返回的 所以需要引入cb 里面是cb cb第一个参数是err 第二个是转换成功的代码 第三个是输出map文件
    // console.log("resourcePath", this.resourcePath);
    babel.transform(source, {
        ...options,
        sourceMaps: true, // 配置完map
        // filename: this.resourcePath.split("/").pop() // 设置文件名
    }, function(err, result) {
        // console.log("err", err);
        // console.log("result", result);
        // cb第一个参数如果随便填值会被认为是一个错误
        cb(err, result.code, result.map) // 异步
        // cb(err, result.code) // 异步
    })
    // return source;
}
module.exports = loader;

// this为
// [
//     'version',                'emitWarning',
//     'emitError',              'getLogger',
//     'exec',                   'resolve',
//     'getResolve',             'emitFile',
//     'rootContext',            'webpack',
//     'sourceMap',              'mode',
//     '_module',                '_compilation',
//     '_compiler',              'fs',
//     'target',                 'loadModule',
//     'context',                'loaderIndex',
//     'loaders',                'resourcePath',
//     'resourceQuery',          'async',
//     'callback',               'cacheable',
//     'addDependency',          'dependency',
//     'addContextDependency',   'getDependencies',
//     'getContextDependencies', 'clearDependencies',
//     'resource',               'request',
//     'remainingRequest',       'currentRequest',
//     'previousRequest',        'query',
//     'data'
//   ]

// babel.transform转换后的result*********************
// babel.transform转换后的result*********************
// babel.transform转换后的result*********************
// {
//     metadata: {},
//     options: {
//       assumptions: {},
//       sourceMaps: true,
//       filename: 'C:\\Users\\tcsc6\\Desktop\\webpack-source\\write-loader\\src\\index.js',
//       targets: {},
//       cloneInputAst: true,
//       babelrc: false,
//       configFile: false,
//       browserslistConfigFile: false,
//       passPerPreset: false,
//       envName: 'development',
//       cwd: 'C:\\Users\\tcsc6\\Desktop\\webpack-source\\write-loader',
//       root: 'C:\\Users\\tcsc6\\Desktop\\webpack-source\\write-loader',
//       plugins: [
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin],
//         [Plugin], [Plugin], [Plugin], [Plugin]
//       ],
//       presets: [],
//       parserOpts: {
//         sourceType: 'module',
//         sourceFileName: 'C:\\Users\\tcsc6\\Desktop\\webpack-source\\write-loader\\src\\index.js',
//         plugins: [Array]
//       },
//       generatorOpts: {
//         filename: 'C:\\Users\\tcsc6\\Desktop\\webpack-source\\write-loader\\src\\index.js',
//         auxiliaryCommentBefore: undefined,
//         auxiliaryCommentAfter: undefined,
//         retainLines: undefined,
//         comments: true,
//         shouldPrintComment: undefined,
//         compact: 'auto',
//         minified: undefined,
//         sourceMaps: true,
//         sourceRoot: undefined,
//         sourceFileName: 'index.js',
//         jsescOption: [Object]
//       }
//     },
//     ast: null,
//     code: '// console.log("src-index");\n' +
//       '// 在js文件中引入其他js文件 此时编译叫做行内编译 行内loader ******\n' +
//       '// -! 不会让文件 再去通过pre + normal loader去处理\n' +
//       '// ! 没有normal\n' +
//       '// !! 处理inline-loader行内loader其余什么都你没有\n' +
//       '// let str = require("-!inline-loader!./b.js")\n' +
//       '// loader默认是由两部分组成的 pitch normal\n' +
//       '// pitch是倒着来的 normal是webpack执行loader的顺序\n' +
//       '// 下面代码是实现babel-loader测试class\n' +
//       '// class Person {\n' +
//       '//     constructor() {\n' +
//       '//         this.zuxian = "monkey"\n' +
//       '//     }\n' +
//       '//     getName() {\n' +
//       '//         return this.zuxian\n' +
//       '//     }\n' +
//       '// }\n' +
//       '// console.log(new Person().getName());\n' +
//       '// import p from "./1.jpg"\n' +
//       '// let img = document.createElement("img");\n' +
//       '// img.src = p;\n' +
//       '// document.body.appendChild(img)\n' +
//       '// require("./index.less")\n' +
//       '"use strict";',
//     map: {
//       version: 3,
//       sources: [ 'index.js' ],
//       names: [],
//       mappings: 'AAAA;AACA;AACA;AACA;AACA;AACA;AAEA;AACA;AAEA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AACA;AAEA;AACA;AACA;AACA;AAGA',
//       sourcesContent: [
//         '// console.log("src-index");\r\n' +
//           '// 在js文件中引入其他js文件 此时编译叫做行内编译 行内loader ******\r\n' +
//           '// -! 不会让文件 再去通过pre + normal loader去处理\r\n' +
//           '// ! 没有normal\r\n' +
//           '// !! 处理inline-loader行内loader其余什么都你没有\r\n' +
//           '// let str = require("-!inline-loader!./b.js")\r\n' +
//           '\r\n' +
//           '// loader默认是由两部分组成的 pitch normal\r\n' +
//           '// pitch是倒着来的 normal是webpack执行loader的顺序\r\n' +
//           '\r\n' +
//           '// 下面代码是实现babel-loader测试class\r\n' +
//           '// class Person {\r\n' +
//           '//     constructor() {\r\n' +
//           '//         this.zuxian = "monkey"\r\n' +
//           '//     }\r\n' +
//           '//     getName() {\r\n' +
//           '//         return this.zuxian\r\n' +
//           '//     }\r\n' +
//           '// }\r\n' +
//           '// console.log(new Person().getName());\r\n' +
//           '\r\n' +
//           '// import p from "./1.jpg"\r\n' +
//           '// let img = document.createElement("img");\r\n' +
//           '// img.src = p;\r\n' +
//           '// document.body.appendChild(img)\r\n' +
//           '\r\n' +
//           '\r\n' +
//           '// require("./index.less")'
//       ]
//     },
//     sourceType: 'script'
//   }