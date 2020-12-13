// 我吃完饭了 你吃的就是我的剩饭
// 瀑布 waterfall
let { SyncWaterfallHook } = require("tapable");
class Lesson {
    constructor() { 
        this.hooks = {
            arch: new SyncWaterfallHook(["name"])
        }
    }
    tap() {
        this.hooks.arch.tap("node", function(name) {
            console.log("node", name);
        });
        this.hooks.arch.tap("vue", function(data) {
            console.log("vue", data);
        });
    }
    start() {
        this.hooks.arch.call("daleizi")
    }
}
let lesson = new Lesson(["name"]);
lesson.tap();
lesson.start(); // 启动钩子
// 输出 node daleizi vue node学的还不错

