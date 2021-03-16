function add(a, b) {
  return a + b;
}
function square(a) {
  return a * a;
}
function plusOne(c) {
  return c + 1;
}
var addSquareAndOnePlus = composite(add, square, plusOne);
// 实现composite
function composite(...args) {
  return function (...arguments) {
    let result = null;
    result = args.reduce((pre, next) => {
      console.log(next);
      if (Array.isArray(pre)) {
        return next.apply(null, pre);
      } else {
        return next.call(null, pre);
      }
    }, arguments);
    return result;
  };
}
console.log(addSquareAndOnePlus(1, 2));


























// 方法一
const composite1 = (...args) => {
    return (...arguments) => {
        const init = args[0].apply(null, arguments);
        return args.slice(1).reduce((memo, current) => {
            return current(memo) 
        }, init)
    }
}
// 方法二
const composite2 = (...args) => {
    return (...arguments) => {
        return args.reduce((memo, current) => {
            return current(typeof memo === "function" ? memo.apply(memo, arguments) : memo);
        })
    }
}