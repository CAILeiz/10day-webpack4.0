## 谈谈 JavaScript 执行线程
const num = 3;
function addOne(x) {
    const result = x + 1; 
    return result;
}
const output = addOne(num);

## 执行流程
1. 当执行 JavaScript 时，代码会逐行（单线程）执行，因此在我们的代码中，要被执行的第一行是：
1const num = 3;
num 存储在全局内存/执行上下文中，看起来像这样：
Global Memory
num: 3
2. 然后进入下一行：function addOne(x) {
请务必注意，我们在这里声明了一个函数，但是还不执行。因此，我们将函数名称与整个函数的值一起存储。
Global Memory
num: 3
addOne: - f - [- f - 是整个函数的简写]
3. 现在转到下一行，有人可能认为下一行是函数的主体，但是由于我们仅声明函数而不是运行它，因此要运行的下一行是：
const output = addOne(num);
与上面类似，我们将标签 output 发送到内存，但还没有值，因为我们必须运行函数。
4. 有趣的来了！接下来执行 addOne 函数。
当一个函数被执行时，它被添加到 call stack（调用栈）中。
调用堆栈的底部总是有 global/main ，我们现在将 addOne(3) 入栈。
call stack 
|_
addOne(3) 入回调函数栈
栈底
global()
5. 当执行到addOne(3)的时候我们还为该函数创建一个 execution context （执行上下文）。函数中声明的任何变量都会被添加到函数的执行上下文中。
将要添加的第一个变量是函数的参数，在本例中为 x。
execution context
x: 3
6. 在下一行，用了 return 关键字来标记函数的结束。我们从调用栈中弹出 addOne()，并给 output 赋值为4。
execution context
x: 3
result: 4
[***]所以首先从 call stack 中弹出 addOne。 在call Stack中只剩下global()
7. 就是这些了！我希望这能够演示 JavaScript 代码是如何逐步执行的。在本文中提到了 call stack （调用栈）和 execution context（执行上下文），将来我们将会更深入地研究它们。












