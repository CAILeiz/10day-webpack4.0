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

## Tapable结构
tapable库中有三种注册方法 tap同步注册 tapAsync注册 tapPromise注册
依次传值为 name  | (name, cb) | name
依次触发的事件为 call(name, fn) | callAsync(name, fn) | promise(name, fn) 

## 同步钩子功能介绍
SyncHook  注册事件并依次执行
SyncBailHook 只要监听函数返回一个非undefined的值 就会停止执行  
SyncWaterfallHook 执行的过程中除了第一个事件中的参数是传递进来的其余的都是上一个给的
SyncLoopHook  同步执行不返回undefined的监听函数会多次执行 直到返回undefined


## 异步钩子AsyncParallelHook 功能介绍 
回调方法 同时发送多个请求 
注册事件的时候需要使用 tapAsync 这里面需要传2个参数 第二个参数是cb 所有的cb执行完才会执行最后的 callAsync里面的回调函数
注册事件还可以使用tapPromise方法 传参(name, promise函数) 调用promise.then()


## 异步钩子AsyncParallelBailHook 功能介绍 
带保险的异步并发的钩子
就是可能会失败 失败的话只触发成功的


## AsyncSeriesBailHook 异步串行
1. tapAsync注册 callAsync执行
源码使用的是next函数递归 当index等于注册函数的个数时执行callAsync注册的函数
2. tapPromise注册 promise执行 
源码使用的是 reduce 前一个promise执行完, .then第二个promise执行 最后返回reduce这个promise 
在promise.then() 即可执行事件

