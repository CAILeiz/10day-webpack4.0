class AsyncSeriesHook {
    constructor(args) { // args 想当于["name"]
        this.tasks = [];
    }
    /* 
    * params name 事件名称
    * params task 事件
    */
   tapAsync(name, task) {
        this.tasks.push(task);
    }
    callAsync(...args) {
        let finalCallback = args.pop();
        let index = 0, len = this.tasks.length;
        let next = () => {
            console.log(index);
            if(index == len){
                finalCallback();
                return;
            }  
            let task = this.tasks[index++];
            task(...args, next);
        }
        next();
    }
}
let hook = new AsyncSeriesHook(["name"]);
hook.tapAsync("react", function(name, cb) {
    setTimeout(() => {
        console.log("vue", name);
        cb()
    }, 1000);
});
hook.tapAsync("node", function(name, cb) {
    setTimeout(() => {
        console.log("node", name);
        cb()
    }, 1000);
});
hook.callAsync("daleizi", res => {
    console.log("end");
});