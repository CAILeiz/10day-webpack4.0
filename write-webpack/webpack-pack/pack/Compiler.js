let path = require("path");
let fs = require("fs");
let ejs = require("ejs");
let {SyncHook} = require("tapable");
let babylon = require("babylon");
let traverse = require("@babel/traverse").default;
let t = require("@babel/types");
let generator = require("@babel/generator").default;
// babylon 主要是把源码转换成 ast
// @babel/traverse 遍历ast
// @babel/types 把遍历好的节点进行替换
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
        // 执行该文件的工作路径 父路径
        this.root = process.cwd();
        // ./src/index.js C:\Users\19129\Desktop\10day-webpack4.0\write-webpack\webpack-pack
        // 入口文件的绝对路径
        this.entryAbsolutePath = path.join(this.root, this.entry);
        // 声明webpack的钩子函数
        this.hooks = {
            entry: new SyncHook(),
            run: new SyncHook(),
            compile: new SyncHook(),
            afterCompile: new SyncHook(),
            afterPlugins: new SyncHook(),
            emit: new SyncHook(),
            done: new SyncHook(),
        }
        let plugins = this.config.plugins;
        if(Array.isArray(plugins)) {
            plugins.forEach( plugin => {
                plugin.apply(this);
            })
        }
        this.hooks.afterPlugins.call();
    }
    run() {
        this.hooks.run.call(); 
        // 执行 并创建模块的依赖关系 
        // params 第一个传的是打包文件的绝对路径 第二个是是否是主模块 首先就要从主模块开始编译
        this.hooks.compile.call(); 
        this.buildModule(this.entryAbsolutePath, true);
        this.hooks.afterCompile.call(); 
        // console.log("modules", this.modules);
        // console.log("entryId", this.entryId);

        // 发射一个文件 打包后的文件
        this.hooks.emit.call(); 
        this.emitFile()
        this.hooks.done.call(); 
    }
    getSource(modulePath) {
        let rules = this.config.module.rules;
        console.log("modulePath", modulePath);
        let content = fs.readFileSync(modulePath, "utf-8");
        for (let i = 0; i < rules.length; i++) { // 这个模块通过loader来转化
            let rule = rules[i];
            let {test, use} = rule;
            let len = use.length - 1;
            // console.log(len);
            if(test.test(modulePath)) {
                console.log("modulePath", modulePath);
                // loader获取对应的loader函数
                function normalLoader() {
                    let loader = require(use[len--]);
                    // 递归调用loader实现转化功能
                    content = loader(content);
                    console.log("content", content);
                    if(len >= 0) {
                        normalLoader()
                    }
                }
                normalLoader();
            }
        }
        return content;
    }
    // 构建模块
    buildModule(modulePath, isEntry) {
        // 拿到模块的内容
        let source = this.getSource(modulePath);
        // 获取模块id moduleId = modulePath - this.root  src/index.js
        let moduleName = './' + path.relative(this.root, modulePath);
        // 保存入口的名字
        isEntry && (this.entryId = this.entry);
        // 解析模块内容 将文件中的./路径变成 ./src路径 将require转换为_webpack_require_
        // 解析需要把source源码进行改造 返回一个依赖列表
        let {sourceCode, dependencies} = this.parse(source, path.dirname(moduleName)) //path.dirname(moduleName)获取父路径 为./src
        // 把相对路径和模块中的内容对应起来
        // console.log(sourceCode);
        // console.log(dependencies);
        moduleName = moduleName.replace(/\\/g, '/');
        this.modules[moduleName] = sourceCode;   
        dependencies.forEach(dep => { // 副模块的加载 递归加载
            // console.log("dep", dep);
            this.buildModule(path.join(this.root, dep), false)
        });
        // console.log("modules", this.modules);
    }
    // 解析源码 主要靠AST解析语法树
    parse(source, parentPath) {
        let ast = babylon.parse(source);
        // console.log("ast", ast);
        let dependencies = []; // 依赖的数组
        traverse(ast, {
            CallExpression(p) { 
                // console.log("p",p);
                let node = p.node; // 对应的节点
                if(node.callee.name === "require") {
                    node.callee.name = "__webpack_require__"; // 把require进行改造
                    let moduleName = node.arguments[0].value; // 取到的就是模块的引用名字 require里面的内容
                    // console.log("node", node);
                    moduleName = moduleName + (path.extname(moduleName) ? '' : ".js");
                    moduleName = './' +  path.posix.join(parentPath, moduleName);
                    // console.log("parentPath", parentPath);
                    // console.log("moduleName", moduleName);
                    dependencies.push(moduleName);
                    
                    // console.log("dependencies", dependencies);
                    node.arguments = [t.stringLiteral(moduleName)];
                }
            }
        })
        let sourceCode = generator(ast).code; // 生成的源码
        // console.log("sourceCode", sourceCode);
        return {sourceCode, dependencies};
    }
    emitFile() { // 发射文件
        // 用数据渲染
        // 拿到输出路径
        let main = path.join(this.config.output.path, this.config.output.filename);
        let templateStr = this.getSource(path.resolve(__dirname, "main.ejs"));
        let code = ejs.render(templateStr, {entryId: this.entryId, modules: this.modules});
        console.log("code", code);
        this.assets = {};
        this.assets[main] = code;
        // console.log("main", main);
        fs.writeFileSync(main, code, {flag: "w"})
    }
}
module.exports = Compiler;

// node属性 ast对象
// {
// type: 'CallExpression',
// start: 10,
// end: 27,
// loc: SourceLocation { start: [Position], end: [Position] },
// callee: Node {
//     type: 'Identifier',
//     start: 10,
//     end: 17,
//     loc: [SourceLocation],
//     name: 'require'
// },
// arguments: [ [Node] ]
// },