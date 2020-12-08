let str = require("./a");

console.log(str);
require("./index.css")
require("./index.less")

let fn = () => {
    console.log("箭头函数");
}
fn();
@log
class A { // 相当于 new A() a = 1; 是es7里面的 需要使用到一个babel/plugin-proposal-class-properties插件
    a = 1
}
console.log(new A().a);
function log(target) {
    console.log(target);
}