let path = require("path");
let fs = require("fs");

let babylon = require("babylon");
let traverse = require("@babel/traverse").default;
let t = require("@babel/types");
let generator = require("@babel/generator").default;
// babylon 主要是把庅转换成 ast
// @babel/traverse 遍历节点
// @babel/types 把遍历好的节点替换一下
// @babel/generator 把替换好的结果生成

class Compiler {
    constructor(config) {
        // entry output
        this.config = config;
        // 需要保存入口文件的依赖 "./src/index.js"
        this.entryId; 
        // 需要保存所有的模块
        this.modules = {};
        this.entry = config.entry;
        // 工作路径
        this.root = process.cwd();
        // console.log(this.entry, this.root);
        // ./src/index.js C:\Users\19129\Desktop\10day-webpack4.0\write-webpack\webpack-pack
        
        // 入口文件的绝对路径
        this.entryAbsolutePath = path.join(this.root, this.entry);
    }
    getSource(modulePath) {
        let content = fs.readFileSync(modulePath, {encoding: "utf-8"});
        return content;
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 获取模块id moduleId = modulePath - this.root  src/index.js
        let moduleName = './' + path.relative(this.root, modulePath);
        // 保存入口的名字
        isEntry && (this.entryId = modulePath);
        // 解析模块内容 将文件中的./路径变成 ./src路径 将require转换为_webpack_require_
        // 解析需要把source源码进行改造 返回一个依赖列表
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName)) //path.dirname(moduleName)获取父路径 为./src
        // 把相对路径和模块中的内容对应起来
        console.log(sourceCode);
        console.log(dependencies);
        this.modules[moduleName] = sourceCode;
    }
    // 解析源码 主要靠AST解析语法树
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        let dependencies = []; // 依赖的数组
        traverse(ast, {
            CallExpression(p) { 
                console.log("p",p);
                let node = p.node; // 对应的节点
                if(node.callee.name === "require") {
                    node.callee.name = "__webpack_require__";
                    let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字
                    moduleName = moduleName + (path.extname(moduleName) ? '' : ".js");
                    moduleName = './' +  path.join(parentPath, moduleName);
                    dependencies.push(moduleName);
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        })
        let sourceCode = generator(ast).code; // 生成的源码
        return {sourceCode, dependencies};
    }
    emitFile() {}
    run() {
        // 执行 并创建模块的依赖关系 
        // params 第一个传的是打包文件的绝对路径 第二个是是否是主模块 首先就要从主模块开始编译
        this.buildModule(this.entryAbsolutePath, true);
        // 发射一个文件 打包后的文件
        this.emitFile()
    }
}
module.exports = Compiler;