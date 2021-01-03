function Iterator(array) {
    let nextIndex = 0;
    return {
        next: function() {
            return  {
                value: array[nextIndex++],
                done: nextIndex < array.length ? false : true
            }
        }
    }
}
let iterator = new Iterator(['a', 'b']);
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());