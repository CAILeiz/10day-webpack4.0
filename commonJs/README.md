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

## CommonJS·AMD·UMD·ES6
1. CommonJS
[特点]
使用require和exports关键字和模块系统进行交互
CommonJS不支持异步加载
一个文件就是一个模块
[Nodejs的模块规范受到了CommonJS的影响，但Nodejs支持使用module.exports导出对象，而CommonJS只使用exports。CommonJS模块在未经编译前无法使用。示例如下。]
示例: 
// modules/physics.js文件
module.exports = {
  lorentzTransformation () {
  },
  maxwellSEquations () {
  }
}
// index.js文件
const physics = require('./modules/physics')
physics.lorentzTransformation()
physics.maxwellSEquations()
[module.exports和exports的联系]
module是一个带有exports属性的对象，exports是普通的js变量，是module.exports的引用。如果设置exports.name = '叶奈法'，相当于设置module.exports.name = '叶奈法'。但是，如果给exports设置了一个新的对象，exports和module.exports将不再是同一个对象。

2. AMD
[背景]
AMD诞生的原因是，是因为CommonJS不支持异步加载，不适合浏览器环境。RequireJS实现了AMD API。示例如下。
```javascript
在index.html中使用<script/>标签加载RequireJS，通过data-main属性指定主文件。
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>AMD</title>
  <!-- require.js -->
  <script data-main='./index.js' src="./require.js"></script>
</head>
<body>
</body>
</html>
define关键字用于定义模块，模块分为独立模块（不依赖其他模块的模块）以及非独立模块（依赖其他模块的模块）
// 独立模块
// libs/geometry.js
define(function() {
  'use strict';
  return {
    pythagoreanTheorem(a, b) {
      return a * a + b * b
    }
  }
})
// 非独立模块，本模块引用了geometry模块
// libs/math.js
define(['./geometry.js'], function(geometry) {
  'use strict';
  return {
    geometry: {
      pythagoreanTheorem: geometry.pythagoreanTheorem
    }
  }
})
require关键字用来引用模块
// index.js
// 加载math模块
require(['./libs/math'], function (math) {
  var c = math.geometry.pythagoreanTheorem(1, 2)
  alert(c)
})
```

3. ES6
ES6在语言层面上实现了模块机制，与CommonJS与AMD规范不同的是ES6的模块是静态的，不能在文件的任何地方使用。这种行为使得编译器编译时就可以构建依赖关系树，但是在ES6模块没法在浏览器中完全实现，需要使用babel，webpack。
```javascript
// src/modules/physics.js
export function maxwellSEquations () {
  alert('maxwellSEquations')
}
// src/main.js
import { maxwellSEquations } from './modules/physics'
maxwellSEquations()
```


4. UMD
UMD模块是一种通用的模式，用于兼容AMD和CommonJS的规范。UMD规范同时兼容amd和commonjs，并支持传统的全局变量的模式。

UMD模块的顶端通常都会有如下的代码，用来判断模块加载器环境。
```javascript
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // 全局变量
    root.returnExports = factory(root.jQuery);
  }
}(this, function ($) {
  // ...
}));
```




