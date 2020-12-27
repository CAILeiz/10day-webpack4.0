class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename
    }
    apply(compiler) {
        // 调用webpack中的emit钩子
        // 文件已经准备好了 要进行发射的时候调用
        compiler.hooks.emit.tap("FileListPlugin", (compliation) => {
            console.log(compliation.assets);
            let assets = compliation.assets;
            let content = `## 文件名      资源大小\r\n`;
            // [[bundle.js, {}], [home.html, {}]]
            Object.entries(assets).forEach(([filename, statObj]) => {
                content += `--${filename}    ${statObj.size()}\r\n`;
            })
            // 资源对象增加一个文件
            assets[this.filename] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            }
        })
    }
}
module.exports = FileListPlugin
// compliation.assets 对象详情
// {
//   'bundle.js': CachedSource {
//     _source: ConcatSource { _children: [Array], _isOptimized: false },
//     _cachedSourceType: undefined,
//     _cachedSource: undefined,
//     _cachedBuffer: undefined,
//     _cachedSize: undefined,
//     _cachedMaps: Map {},
//     _cachedHashUpdate: undefined
//   },
//   'home.html': { source: [Function: source], size: [Function: size] }
// }