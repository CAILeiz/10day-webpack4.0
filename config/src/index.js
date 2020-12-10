let xhr = new XMLHttpRequest();
console.log(xhr);
xhr.open("GET", "/user", true);
xhr.onload = function() {
    console.log(xhr);
    console.log(xhr.response);
}
xhr.send()

// console.log("index");
// class Log {
//     constructor() {
//         console.log("出错了111111111111111");
//     }
// }
// new Log();