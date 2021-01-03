## generator（生成器）是ES6标准引入的新的数据类型。一个generator看上去像一个函数，但可以返回多次。
ES6定义generator标准的哥们借鉴了Python的generator的概念和语法，如果你对Python的generator很熟悉，那么ES6的generator就是小菜一碟了。如果你对Python还不熟，赶快恶补Python教程！。
我们先复习函数的概念。一个函数是一段完整的代码，调用一个函数就是传入参数，然后返回结果：
function foo(x) {
    return x + x;
}
var r = foo(1); // 调用foo函数
函数在执行过程中，如果没有遇到return语句（函数末尾如果没有return，就是隐含的return undefined;），控制权无法交回被调用的代码。

## generator跟函数很像，定义如下：
function* foo(x) {
    yield x + 1;
    yield x + 2;
    return x + 3;
}
generator和函数不同的是，generator由function*定义（注意多出的*号），并且，除了return语句，还可以用yield返回多次。
大多数同学立刻就晕了，generator就是能够返回多次的“函数”？返回多次有啥用？

## 还是举个栗子吧。
我们以一个著名的斐波那契数列为例，它由0，1开头：
0 1 1 2 3 5 8 13 21 34 ...
要编写一个产生斐波那契数列的函数，可以这么写：
1. 入参是值的个数
function fib(max) {
    var
        t,
        a = 0,
        b = 1,
        arr = [0, 1];
    while (arr.length < max) {
        [a, b] = [b, a + b];
        arr.push(b);
    }
    return arr;
}
// 测试:
fib(5); // [0, 1, 1, 2, 3]
fib(10); // [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
2. 函数只能返回一次，所以必须返回一个Array。但是，如果换成generator，就可以一次返回一个数，不断返回多次。用generator改写如下：
function* fib(max) {
    var
        t,
        a = 0,
        b = 1,
        n = 0;
    while (n < max) {
        yield a;
        [a, b] = [b, a + b];
        n ++;
    }
    return;
}
直接调用试试：
var f = fib(5);
f.next(); // {value: 0, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 1, done: false}
f.next(); // {value: 2, done: false}
f.next(); // {value: 3, done: false}
f.next(); // {value: undefined, done: true}
## 总结(*******************)
next()方法会执行generator的代码，然后，每次遇到yield x;就返回一个对象{value: x, done: true/false}，然后“暂停”。返回的value就是yield的返回值，done表示这个generator是否已经执行结束了。如果done为true，则value就是return的返回值。
当执行到done为true时，这个generator对象就已经全部执行完毕，不要再继续调用next()了。

