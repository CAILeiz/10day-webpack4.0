(() => {
  var __webpack_modules__ = {
    
        "./src/index.js": (module, __unused_webpack_exports, __webpack_require__) => {
          eval(
            `let str = __webpack_require__("./src/a.js");

__webpack_require__("./src/index.less");

console.log(str);`
          );
        },
    
        "./src/a.js": (module, __unused_webpack_exports, __webpack_require__) => {
          eval(
            `let b = __webpack_require__("./src/b.js");

module.exports = 'a' + b;`
          );
        },
    
        "./src/b.js": (module, __unused_webpack_exports, __webpack_require__) => {
          eval(
            `module.exports = "b";`
          );
        },
    
        "./src/index.less": (module, __unused_webpack_exports, __webpack_require__) => {
          eval(
            `let style = document.createElement("style");
style.innerHTML = "body {\\n  background: red;\\n}\\n";
document.head.appendChild(style);`
          );
        },
    
  };
  var __webpack_module_cache__ = {};
  function __webpack_require__(moduleId) {
    if (__webpack_module_cache__[moduleId]) {
      return __webpack_module_cache__[moduleId].exports;
    }
    var module = (__webpack_module_cache__[moduleId] = {
      exports: {},
    });
    __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
    return module.exports;
  }
  (() => {
    eval(
      'let str = __webpack_require__("./src/index.js");'
    );
  })();
})();
