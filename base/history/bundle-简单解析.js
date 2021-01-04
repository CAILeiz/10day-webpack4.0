 (() => {
 	var __webpack_modules__ = ({
    "./src/a.js": // key -> 模块的路径
    ((module) => {  // value 执行函数
      eval("module.exports = \"daleizi\";\n\n//# sourceURL=webpack://10day-webpack4.0/./src/a.js?");
    })
 	});
 	var __webpack_module_cache__ = {};
   	function __webpack_require__(moduleId) { // 实现了一个require方法 因为require不能在浏览器中运行
 		if(__webpack_module_cache__[moduleId]) { // 先定义一个cache 判断是否有cache 如果有直接返回exports
 			return __webpack_module_cache__[moduleId].exports;
 		}
 		var module = __webpack_module_cache__[moduleId] = {
 			exports: {}
 		};
 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
 		return module.exports;
 	}
  (() => {
    eval("let str = __webpack_require__(/*! ./a */ \"./src/a.js\");\r\n\r\nconsole.log(str);\n\n//# sourceURL=webpack://10day-webpack4.0/./src/index.js?");
  })();
 })();