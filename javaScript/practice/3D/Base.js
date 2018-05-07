// JavaScript source code
/*
var Base = {                                                    //创建一个基础库
    getId : function (id) {                                      //获取id的方法           
        return document.getElementById(id);
    },
    getClass: function (name){
        return document.getElementsByClassName(name);
    },
    getTagName: function (tag) {
        return document.getElementsByTagName(tag);
    }
}

*/
var $ = function () {
    return new Base();
}
//基础库
function Base() {
    this.elements = [];
}
//获取ID
Base.prototype.getId = function (id) {
    this.elements.push(document.getElementById(id));
    return this;
}
//获取class
Base.prototype.getClass = function (name) {
    var classname = document.getElementsByClassName(name);
    for (i = 0; i < classname.length; i++) {
        this.elements.push(classname[i]);
    }
    return this;
}
//获取节点元素
Base.prototype.getTagName = function (name) {
    var tags = document.getElementsByTagName(name);
    for (var i = 0 ; i < tags.length; i++) {
        this.elements.push(tags[i]);
    }
    return this;
}
//设置CSS样式
Base.prototype.css = function (attr,value) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].style[attr] = value;
    }
    return this;
}
//设置innerHTML
Base.prototype.html = function (str) {
    for (var i = 0; i < this.elements.length; i++) {
        this.elements[i].innerHTML = str;
    }
    return this;
}
//触发点击事件
Base.prototype.click = function (fn) {
    for (var i = 0 ; i < this.elements.length; i++) {
        this.elements[i].onclick = fn;
    }
    return this;
}
//鼠标移入事件
// Base.prototype.mouseover = function (fn) {
//     for (var i = 0 ; i < this.elements.length; i++) {
//         this.elements[i].onmouseover = fn;
//     }
//     return this;
// }
// //鼠标移出事件
// Base.prototype.mouseout = function (fn) {
//     for (var i = 0 ; i < this.elements.length; i++) {
//         this.elements[i].onmouseout = fn;
//     }
//     return this;
// }
//添加鼠标移入移出事件
Base.prototype.hover = function (over,out) {
    for (var i = 0 ; i < this.elements.length; i++) {
        this.elements[i].onmouseover = over;
        this.elements[i].onmouseout = out;
    }
    return this;
}













