// 只有import 在生产环境下 会自动去除没用的代码
// 这种模式被叫做 tree-shaking 把没用的代码自动删除掉
// import calc from "./react.js"
// console.log(calc.sum(1, 2));
// es模块 会把打包结果放到default中
let calc = require("./react.js");
console.log(calc.default.sum(1, 2 ));
// scope hosting 作用域提升
let a  = 1;
let b  = 1;
let c  = 1;
let d  = a + b + c; // 在webpack中自动省略a b c 直接输出3 可以简化代码
console.log(d);