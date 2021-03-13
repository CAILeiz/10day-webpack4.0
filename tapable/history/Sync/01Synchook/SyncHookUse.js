// let { SyncHook } = require("tapable");
// console.log(SyncHook);
// class Lesson {
//     constructor() { 
//         this.hooks = {
//             arch: new SyncHook(["name"])
//         }
//     }
//     tap() { // 注册监听事件
//         this.hooks.arch.tap("vue", function(name) {
//             console.log("vue", name);
//         });
//         this.hooks.arch.tap("node", function(name) {
//             console.log("node", name);
//         });
//     }
//     start() {
//         this.hooks.arch.call("daleizi")
//     }
// }
// let lesson = new Lesson(["name"]);
// lesson.tap();
// lesson.start(); // 启动钩子



const { SyncHook } = require("tapable");
console.log(SyncHook);
hooks = {
    arch: new SyncHook(["name"])
}
hooks.arch.tap("vue", function(name) {
    console.log("vue", name);
})
hooks.arch.tap("react", function(name) {
    console.log("react", name);
})
hooks.arch.call('1111');

