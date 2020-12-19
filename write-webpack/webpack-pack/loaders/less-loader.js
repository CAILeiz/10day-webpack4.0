let less = require("less");
function loader(source) {
    let css = "";
    less.render(source, (err, optput) => {
        if(err) {
            throw err;
        }
        css = optput.css;
    })
    css = css.replace(/\n/g, "\\n");
    return css;
}
module.exports = loader;