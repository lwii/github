/**
 * Created by admin on 2018/5/11.
 */

/*
//1引入模块
let fs = require("fs");
//2创建读取,写入流
let rs = fs.createReadStream("C:/Users/admin/Music/潮湿的心.mp3");
let ws = fs.createWriteStream("cxdx.mp4");
//3监听流的打开和关闭
ws.once("open",() => {
    console.log("写入流通道已经开启");
});
ws.once("close",() => {
    console.log("写入流通道已经关闭");
});
rs.once("open",() => {
    console.log("读取流通道已经开启");
});
rs.once("close",() => {
    console.log("读取流通道已经关闭");
});
//4绑定data
rs.on("data",(data) => {
    ws.write(data);
});
*/

//1引入模块
let fs = require("fs");
//2创建读取,写入流
let rs = fs.createReadStream("C:/Users/admin/Music/潮湿的心.mp3");
let ws = fs.createWriteStream("cxdx.mp4");
//3创建管道
rs.pipe(ws);
