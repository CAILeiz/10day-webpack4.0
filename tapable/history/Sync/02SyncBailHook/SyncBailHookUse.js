let { SyncBailHook } = require("tapable");
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new SyncBailHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tap("vue", function(name) {
            console.log("vue", name);
            return "想停止学习"
        });
        this.hooks.arch.tap("node", function(name) {
            console.log("node", name);
        });
    }
    start() {
        this.hooks.arch.call("daleizi")
    }
}
let lesson = new Lesson();
lesson.tap();
lesson.start(); // 启动钩子