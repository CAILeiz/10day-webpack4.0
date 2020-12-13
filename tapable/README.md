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