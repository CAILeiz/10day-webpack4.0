## tapable介绍
Webpack本质上是一种事件流的机制，它的工作流程就是将各个插件串联起来，而实现这一切的核心就是Tapable,Tapable有点类似于nodejs的events库，核心原理也是依赖于发布订阅模式。
node_modules/webpack/lib/Compoler.js


## Tapable结构
Tapable = {
    Sync: {
        SyncHook, 同步钩子
        SyncBailHook, 同步保险钩子 可决定是否往下走
        SyncWaterfallHook,
        SyncLoopHook   
    },
    Async: {
        AsyncParallel : {
            AsyncParallelHook,
            AsyncParallelBailHook
        },
        AsyncSeries: {
            AsyncSeriesHook,
            AsyncSeriesBailHook,
            AsyncSeriesWaterfallHook
        }
    }
}

## 同步钩子功能介绍
SyncHook  注册事件并依次执行
SyncBailHook 只要监听函数返回一个非undefined的值 就会停止执行  
SyncWaterfallHook 执行的过程中除了第一个事件中的参数是传递进来的其余的都是上一个给的
SyncLoopHook  同步执行不返回undefined的监听函数会多次执行 直到返回undefined
