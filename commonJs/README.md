## commonJs是前端模块化规范的其中一种，主要使用在node.js。
每个文件都是一个模块，有自己的作用域。在一个文件里面定义的变量、函数、类，都是私有的，对其他文件不可见。

## 特点
1. 所有模块运行在模块自己的作用域中，不影响全局作用域；
2. 模块可以被多次加载，但只有第一次会运行一次，后面再加载使用缓存。
3. 读取模块的路径可以不加后缀，自动找到对应后缀模块。


## 手写commonjs 思路
1. 定义require方法 里面主要是为了返回读取文件的结果
2. 在这里面还需要考虑到出传入的文件名没有后缀,我们通过getPath给它加上,并且将相对路径转换为绝对路径
3. 判断是否有缓存,如果有直接返回,没有就将cache的属性定为文件的绝对路径,属性值通过fs.extname()对应的方法[在Module的prototype中定义的方法]
4. 在Module定义的方法有[".js"],[".json"], 不同后缀名定义的读取文件的方法不一致
5. [".js"]是通过vm.runInThisContext

```javascript
Module.extensions['.js'] = function (module) {
    let script = fs.readFileSync(module.id, 'utf8');
    // 定义一个方法
    const wrapper = `(function (exports, require, module, __dirname, __filename) {${script}})`;
    const fn = vm.runInThisContext(wrapper);
    fn(module.exports, req, module, __dirname, __filename);
    return module.exports;
};
Module.extensions['.json'] = function (module) {
    let jsonContent = fs.readFileSync(module.id, 'utf8');
    return JSON.parse(jsonContent);
};
备注: 
vm.runInThisContext(code, options)
const vm = require('vm');
let localVar = 'initial value';
const vmResult = vm.runInThisContext('localVar = "vm";');
console.log(`vmResult: '${vmResult}', localVar: '${localVar}'`);
// 打印: vmResult: 'vm', localVar: 'initial value'

const evalResult = eval('localVar = "eval";');
console.log(`evalResult: '${evalResult}', localVar: '${localVar}'`);
// 打印: evalResult: 'eval', localVar: 'eval'
[结论]
正因 vm.runInThisContext() 无法获取本地作用域，故 localVar 的值不变。 相反，eval() 确实能获取本地作用域，所以 localVar 的值被改变了。 如此看来， vm.runInThisContext() 更像是间接的执行 eval(), 就像 (0,eval)('code')。
```


