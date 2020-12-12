let btn = document.createElement("button");
btn.innerHTML = "懒加载";
// 路由懒加载 vue或者react都是用的import().then()
btn.addEventListener("click", _ => {
    console.log("click");
    // es6 草案的语法 jsonp实现动态加载文件
    import("./source.js").then( data => {
        console.log(data.default);
    })
})
document.body.appendChild(btn)

console.log("module", module);
if(module.hot) {
    module.hot.accept("./source.js", _ => {
       let str =  require("./source.js");
       console.log(str);
    })
}