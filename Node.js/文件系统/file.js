/**
 * Created by admin on 2018/5/10.
 */
/*//�ļ�ϵͳ---ͬ����д�ļ�
 //1:����ģ��
let fs = require("fs");
//2:���ļ�
let fd = fs.openSync("lwii.txt","w");
console.log(fd);
//3:д���ļ�
fs.writeFileSync(fd,"����ѧϰ��node�е��ļ�ϵͳ,��������д���ļ�");
//4:���沢�˳�
fs.closeSync(fd);
*/

//�ļ�ϵͳ---�첽��д�ļ�
  //1:����ģ��
let fs = require("fs");
 //2:���ļ�
fs.open("lwii1.txt","a",(err,fd) => {
    //2.1:�ж��Ƿ����
    if(!err){
        //2.2:д���ļ�
        fs.writeFile(fd,"lwii go home!",(err) => {
            //2.2.1:�ж�д���ļ��Ƿ����
            if(!err){
                console.log("д���ļ��ɹ�");
            }else{
                throw err;
            }
            //2.3:�����ļ����˳�
            fs.close(fd,(err) => {
                //2.3.1:�жϱ����ļ����˳��Ƿ����
                if(!err){
                    console.log("�����ļ����˳�");
                }else{
                    throw err;
                }
            });
        });
    }else{
        throw err;
    }
});
