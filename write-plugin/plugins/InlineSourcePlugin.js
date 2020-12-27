// 把外链的标签变成内联的标签 
const HtmlWebpackPlugin = require("html-webpack-plugin");
class InlineSourcePlugin {
    constructor({ match }) {
        this.reg = match;
    }
    processTags(data, compilcation) {
        let headTags = [];
        let bodyTags = [];
        data.headTags.forEach(headTag => {
            headTags.push(this.processTag(headTag, compilcation));
        })
        data.bodyTags.forEach(bodyTag => {
            bodyTags.push(this.processTag(bodyTag, compilcation));
        })
        return {...data, headTags, bodyTags};
    }
    processTag(tag, compliation) {
        let newTag, url;
        if(tag.tagName === "link" && this.reg.match(tag.attributes.href)) {
            newTag = {
                tagName: "style",
                attributes: {type: "text/css"}
            }
            url = tag.attributes.href;
        }
        if(tag.tagName === "script" && this.reg.match(tag.attributes.src)) {
            newTag = {
                tagName: "style",
                attributes: {type: "application/javascript"}
            }
            url = tag.attributes.src;
        }
        if(url) {
            newTag.innerHTML = compliation.assets[url].source(); // 文件内容放到innerHTML上
            delete compliation.assets[url]; // 删除 原有应该生成的资源
            return newTag;
        }
        return tag;
    }
    apply(compiler) {
        // 通过webpackPlugin来实现这个功能
        compiler.hooks.compilcation.tap("InlineSourcePlugin", (compilcation) => {
            HtmlWebpackPlugin.getHooks(compilcation).alterAssetTagGroups.tapAsync("alertPlugin", (data, cb) => {
                console.log(data);
                data = this.processTags(data, compilcation); // 为了使用compliaion.assets
                cb(null, data)
            })
        })
    }
}
module.exports = InlineSourcePlugin;