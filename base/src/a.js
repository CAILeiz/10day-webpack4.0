require("@babel/polyfill");
class B {

}

// 如果不加运行时转译  会报错
// a.js:1 Uncaught ReferenceError: regeneratorRuntime is not defined
// 需要用到bebel中的@babel/plugin-transform-runtime 这个插件依赖于生产环境的 @babel/runtime
function * gen() { 
    yield 1;
}
console.log(gen().next());
console.log(2);


// es7的语法 需要引入生产补丁 --save @babel/polyfill
"aaa".includes("a"); 