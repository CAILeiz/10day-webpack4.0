# 1. 三种样式表优先级
（内联样式）Inline style > （内部样式）Internal style sheet >（外部样式）External style sheet > 浏览器默认样式

# 2. background复合属性 
background-color/image/repeat/attachment/position
[简写属性时,属性值的顺序为:]
background-color
background-image
background-repeat
background-attachment
background-position

# 3. color 颜色三种表示方法
十六进制值 - 如: ＃FF0000  #f00红色 #0f0绿色 #00f蓝色
一个RGB值 - 如: RGB(255,0,0) RGBA 最后一个值是透明度
颜色的名称 - 如: red balck...

# 4. text
1. text-align: left center right
2. text-decoration: none underline overline line-through
3. text-transform: uppercase lowercase capitalize
4. text-indent: [文本缩进属性是用来指定文本的第一行的缩进] 40px

# 5.font
font-size 
font-weight 
font-style
fonr-family
用em来设置字体大小
为了避免Internet Explorer 中无法调整文本的问题，许多开发者使用 em 单位代替像素。
em的尺寸单位由W3C建议。
1em和当前字体大小相等。在浏览器中默认的文字大小是16px。
因此，1em的默认大小是16px。可以通过下面这个公式将像素转换为em：px/16=em
[实例]:
h1 {font-size:2.5em;} /* 40px/16=2.5em */
h2 {font-size:1.875em;} /* 30px/16=1.875em */
p {font-size:0.875em;} /* 14px/16=0.875em */

# 6.a标签链接
a:link {text-decoration:none;}    /* unvisited link */
a:visited {text-decoration:none;} /* visited link */
a:hover {text-decoration:underline;}   /* mouse over link */
a:active {text-decoration:underline;}  /* selected link */
[注意:] 
hover必须在:link和 a:visited之后定义才有效.
active必须在hover之后定义是有效的.

# 7. border 简写属性
border-width
border-style (required)
border-color


# 8. 伪元素
:nth-child(n) 选择器匹配父元素中的第 n 个子元素，元素类型没有限制。
:nth-of-type(n)选择器匹配同类型中的第n个同级兄弟元素。

# 9.