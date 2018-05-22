/**
 * Created by admin on 2018/5/10.
 */
/*//文件系统---同步读写文件
 //1:引入模块
let fs = require("fs");
//2:打开文件
let fd = fs.openSync("lwii.txt","w");
console.log(fd);
//3:写入文件
fs.writeFileSync(fd,"今天学习了node中的文件系统,现在正在写入文件");
//4:保存并退出
fs.closeSync(fd);
*/

//文件系统---异步读写文件
  //1:引入模块
let fs = require("fs");
 //2:打开文件
fs.open("lwii1.txt","a",(err,fd) => {
    //2.1:判断是否出错
    if(!err){
        //2.2:写入文件
        fs.writeFile(fd,"lwii go home!",(err) => {
            //2.2.1:判断写入文件是否出错
            if(!err){
                console.log("写入文件成功");
            }else{
                throw err;
            }
            //2.3:保存文件并退出
            fs.close(fd,(err) => {
                //2.3.1:判断保存文件并退出是否出错
                if(!err){
                    console.log("保存文件并退出");
                }else{
                    throw err;
                }
            });
        });
    }else{
        throw err;
    }
});
