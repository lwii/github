/**
 * Created by admin on 2018/5/8.
 */

exports.sun = (...numbers) => {
    let result = 0;
    numbers.forEach((item)=>{
        result += item;
    });
    return result;
};
exports.avg = (...numbers) => {
    let result = 0;
    numbers.forEach((item)=>{
       result += item;
    });
    return result/numbers.length;
};