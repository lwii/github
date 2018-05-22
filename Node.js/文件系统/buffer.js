/**
 * Created by admin on 2018/5/10.
 */

/*
//旧方法,一废弃
let buf = new Buffer(10);
console.log(buf);
*/

//将字符冲转换成二进制
//let str = "lwii";
let str = "李威";
let buf = Buffer.from(str);
console.log(buf.length);
console.log(str.length);
console.log(buf);


/*
let buf1 = Buffer.alloc(5);
buf1[0] = 1;

console.log(buf1);*/
