let less = require("less");
function loader(source) {
    let css;
    less.render(source, function(err, r) {
        css = r.css;
    })
    // console.log("less->css", css);
    return css;
}
module.exports = loader;
