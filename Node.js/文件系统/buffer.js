/**
 * Created by admin on 2018/5/10.
 */

/*
//�ɷ���,һ����
let buf = new Buffer(10);
console.log(buf);
*/

//���ַ���ת���ɶ�����
//let str = "lwii";
let str = "����";
let buf = Buffer.from(str);
console.log(buf.length);
console.log(str.length);
console.log(buf);


/*
let buf1 = Buffer.alloc(5);
buf1[0] = 1;

console.log(buf1);*/
