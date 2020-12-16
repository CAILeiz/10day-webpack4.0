
class Compiler {
    constructor(config) {
        // entry output
        this.config = config;
        this.entryId; // "./src/index.js"
        // 需要保存所有的模块
        this.modules = {};
        this.entry = config.entry; // 入口文件
        this.root = process.pwd();
    }
    buildModule(modulePath, isEntry) {}
    emitFile() { // 发射文件

    }
    run() {
        // 执行 并创建模块的依赖关系 
        /*
        * params 第一个传的是打包文件的绝对路径 第二个是是否是入口
        *
        */
        this.buildModule(path.resolve(this.root, this.entry), true);

        // 发射一个文件
        this.emitFile()
    }
}
module.exports = Compiler;