//console.log(argument.callee);
/*
* (function (exports, require, module, __filename, __dirname) { console.log(argument.callee);
 ^

 ReferenceError: argument is not defined
 at Object.<anonymous> (e:\github\Node.js\Ä£¿é\module.exportsºÍexports.js:1:75)
 at Module._compile (module.js:652:30)
 at Object.Module._extensions..js (module.js:663:10)
 at Module.load (module.js:565:32)
 at tryModuleLoad (module.js:505:12)
 at Function.Module._load (module.js:497:3)
 at Function.Module.runMain (module.js:693:10)
 at startup (bootstrap_node.js:188:16)
 at bootstrap_node.js:609:3
 */

/*
//exports
exports.str = "¹þ¹þ¹þ¹þ";
exports.fn = () => {
    console.log("ºÇºÇºÇ");
};
exports.obj = {name:"lwii",age:30};
*/
//module.exports
exports = {                     //Éú³ÉµÄÊÇÒ»¸ö{}¿Õ¶ÔÏó
    str : "¹þ¹þ¹þ¹þ",
    fn : () => {
        console.log("ºÇºÇºÇ");
    },
    obj:{name:"lwii",age:19},
};
module.exports = {                     //Éú³ÉµÄÊÇ{ str: '????????', fn: [Function: fn],obj: { name: 'lwii', age: 19 } }
    str : "¹þ¹þ¹þ¹þ",
    fn : () => {
        console.log("ºÇºÇºÇ");
    },
    obj:{name:"lwii",age:19},
};