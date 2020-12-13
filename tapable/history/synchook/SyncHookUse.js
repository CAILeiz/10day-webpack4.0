let { SyncHook } = require("tapable");
console.log(SyncHook);
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new SyncHook(["name"])
        }
    }
    tap() { // 注册监听事件
        this.hooks.arch.tap("vue", function(name) {
            console.log("vue", name);
            return "不想学node"
        });
        this.hooks.arch.tap("node", function(name) {
            console.log("node", name);
        });
    }
    start() {
        this.hooks.arch.call("daleizi")
    }
}
let lesson = new Lesson(["name"]);
lesson.tap();
lesson.start(); // 启动钩子

