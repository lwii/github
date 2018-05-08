/**
 * Created by admin on 2018/4/13.
 */
/*
 * 模块加载机制:
 *   路径:
 *       1绝对路径:require("e:/github/Node.js/n1.js");
 *       2相对路径:require("./n1.js");
 *           注意:require("n1.js");这是node加载核心模块,或者是node_modules,跟js不一样
 * */

//require("e:/github/Node.js/n1.js");
//require("./n1.js");

/*  1.首先按照加载的模块的文件名称进行查找
 *   2.如果没有找到,则会在模块文件名称后加上.js的后缀,再进行查找
 *   3.如果还没有找到,则会在模块文件名称后加上.json的后缀,再进行查找
 *   4.如果还没有找到,则会在模块文件名称后加上.node的后缀,再进行查找
 *   查找顺序:文件名称 -> .js -> .json -> .node
 * */


//引入进来
//let fn = require("./n2.js");
//console.log(fn.str);
//fn.test();

/*
//文件模块:自己写模块
let fn = require('./myFunction.js');
console.log(fn.sun(2, 5, 9));
console.log(fn.avg(1, 3, 5));
console.log(fn);
//核心模块:系统自带的模块
let fs = require('fs');
let http = require("http");
console.log(fs);
*/

let rs = require("./module.exports和exports.js");
console.log(rs);