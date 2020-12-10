// 图片处理
import logo from "./logo.png" // 或者使用require引入图片
// 1. 在js中创建图片来引入
// file-loader 默认会在内部生成一张图片 到build目录下
// 把生成的图片的名字返回回来 logo就是返回的图片名字
let img = new Image();
console.log(logo);
img.src = logo;
document.body.appendChild(img);


// 2. 在css引入 background： url("") 
// css-loader会把url转换为 require(url)


// 3. <img src="" alt=""> 使用html-withimg-loader 帮我们解析html文件 编译图片中的src
// 使用url-loader进行base64转换


// import $ from "jquery"
// console.log(window.$);

// expose-loader 暴露loader 内联loader
// pre loader 前置loader postloader 后置loader normal loader 普通loader



// let str = require("./a");
// require("./index.css")
require("./index.less")

// let fn = () => {
//     console.log("箭头函数");
// }
// fn();
// @log
// class A { // 相当于 new A() a = 1; 是es7里面的 需要使用到一个babel/plugin-proposal-class-properties插件
//     a = 1
// }
// console.log(new A().a);
// function log(target) {
//     console.log(target);
// }