/**
 * Created by admin on 2018/5/10.
 */

/*//文件写入流
    //1:引入模块
let fs = require("fs");
    //2:写入文件
let ws = fs.createWriteStream("lwii2.txt");
    //3:打开通道
ws.once("open",() => {
    console.log("通道已经打开");
});
ws.once("close",() => {
    console.log("通道已经关闭");
});
    //4:写入内容
ws.write("我在马路边,");
ws.write("捡到十块钱,");
ws.write("跑到商店里,");
ws.write("买了碗泡面.");
    //5:关闭通道
ws.end();
*/

//文件读取流
    //1:引入模块
let fs = require("fs");
    //2.1:读取文件
fs.readFile("lwii2.txt",(err,data) => {
    if(!err){
        console.log(data);
        console.log(data.toString());
    }else{
        throw err;
    }
});
//2.2:读取图片
fs.readFile("E:/github/vue/vue2.x基础篇/img/2.jpg",(err,data) => {
    if(!err){
        //写入文件图片
        fs.writeFile("2.jpg",data,(err) => {
            if(!err){
                console.log("写入图片成功");
            }else{
                throw err;
            }
        });

    }else{
        throw err;
    }
});
//2.3:读取音频文件
fs.readFile("C:/Users/admin/Music/潮湿的心.mp3",(err,data) => {
    if(!err){
        fs.writeFile("csdx.mp3",data,(err) => {
            if(!err){
                console.log("写入音频成功");
            }else{
                throw err;
            }
        });
    }else{
        throw err;
    }
});