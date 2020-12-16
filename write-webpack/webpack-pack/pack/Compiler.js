let path = require("path");
let fs = require("fs");
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
        this.modules[moduleName] = sourceCode;
    }
    // 解析源码 主要靠AST解析语法树
    parse(source, parentPath) {
        console.log(source, parentPath);
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