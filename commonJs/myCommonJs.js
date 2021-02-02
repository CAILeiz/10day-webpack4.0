const path = require('path');
const fs = require('fs');
const vm = require('vm');

// Module处理
function Module(id) {
    this.id = id;
    this.exports = {};
};
// 缓存
Module.cache = {};
// 不同后缀类型处理
Module.extensions = {};
Module.extensions['.js'] = function (module) {
    let script = fs.readFileSync(module.id, 'utf8');
    const wrapper = `(function (exports, require, module, __dirname, __filename) {${script}})`;
    const fn = vm.runInThisContext(wrapper);
    fn(module.exports, req, module, __dirname, __filename);
    return module.exports;
};
Module.extensions['.json'] = function (module) {
    let jsonContent = fs.readFileSync(module.id, 'utf8');
    return JSON.parse(jsonContent);
};
Module.getPath = function (id) {
    const absPath = path.resolve(id);
    if (fs.existsSync(absPath)) {
        return absPath;
    }
    const extensions = Object.keys(Module.extensions);
    for (let i = 0; i < extensions.length; i++) {
        const extPath = `${absPath}${extensions[i]}`;
        if (fs.existsSync(extPath)) {
            return extPath;
        }
    }
    throw new Error('The file do11 not exist');
}

const req = (id) => {
    const ext = Module.getPath(id);
    if (Module.cache[ext]) {
        return Module.cache[ext];
    }
    const myModule = new Module(ext);
    // 对应后缀方法执行
    const result = Module.extensions[path.extname(ext)](myModule);
    Module.cache[ext] = myModule;
    return result;
};

//以下是使用req的代码块
const func = req('./a');
console.log(func);
func(); // Hello

