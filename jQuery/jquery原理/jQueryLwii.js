/**
 * Created by admin on 2018/5/30.
 */
/*
*   jquery 原理:
*          1:本质是一个闭包,
*          2:为什么用闭包来实现-------> 避免多个框架冲突
*          3:如何让外界访问内部定义的局部变量----->window.xxx = xxx;
*          4:为什么给自己传递一个window参数------>1:方便后期压缩代码,
*                                         2:提升查找效率
*          5:为什么给自己接收一个undefined参数 ----->为了方便后期压缩代码,
*               IE9一下的浏览器undefined可以被修改,为了保证内部使用的undefined不被修改,所以需要一个正确的undefined
* */

    (function(window,undefined){
        var lwjQuery = function(selector){
           return new lwjQuery.prototype.init(selector);
        };
        lwjQuery.prototype = {
            constructor : lwjQuery,
            init : function(selector){
                /*
                * 1:传入'',null undefined NaN 0 false.返回空的lwjQuery对象
                * 2:字符串:
                *         代码片段:会将创建好的DOM元素存储到lwjQuery对象中返回
                *         选择器:会将找到的所有元素存储到lwjQuery对象中返回
                * 3:数组:(数组,伪数组)-->会将数组中存储的元素依次存储到jQuery对象中返回
                * 4:除上述类型以外:  会将传入的数据存储到lwjQuery对象中返回
                */
                selector = lwjQuery.trim(selector);
                if(!selector){                                      //传入'',null undefined NaN 0 false.返回空的lwjQuery对象
                    return true;
                }else if(lwjQuery.isFunction(selector)){                    
                }else if(lwjQuery.isString(selector)){              //传入2:字符串
                    //判断是否是代码片段
                    if(lwjQuery.isHTML(selector)){
                        //1,根据代码片段创建所有元素
                        var temp = document.createElement("div");
                        temp.innerHTML = selector;
                       /* //2,将创建好的一级元素添加到lwjQuery中
                        for(var i = 0; i < temp.children.length; i++){
                            this[i] = temp.children[i];
                        }
                        //3,给lwjQuery对象添加length属性
                        this.length = temp.children.length;*/
                        [].push.apply(this,temp.children);//优化第二步好和第三步
                        //4,返回加工好的this(jquery)
                        //return this;
                    }else{                                  //判断是否是选择器
                        //1,根据传入的选择器找到对应的元素
                        var reg = document.querySelectorAll(selector);
                        //2将找到的元素添加到 lwjQuery上去
                        [].push.apply(this,reg);
                        //3返回加工好的lwjquery(this)
                        //return this;
                    }
                }else if(lwjQuery.isArray(selector)){                 ////传入2:数组
                    //1,将自定义的伪数组转换为真数组
                    var arr = [].slice.call(selector);      
                     //2,将真数组转换为伪数组
                    [].push.apply(this,arr);
                    // return this;
                   /*  //真数组
                    if(({}).toString.apply(selector) === "[object Array]"){
                        [].push.apply(this,selector);
                        return this;
                    } //伪数组
                    else{
                       //1,将自定义的伪数组转换为真数组
                        var arr = [].slice.call(selector);
                        //2,将真数组转换为伪数组
                        [].push.apply(this,arr);
                        return this;
                    } */
                }else{                                      //其他类型数据
                    this[0] = selector;
                    this.length = 1;
                    //return this;
                }
                return this;
            }
        };
        //创建判断传入的参数是否是window的方法
        lwjQuery.isWindow = function(obj){
            return obj !== window;
        };
        //创建判断传入的参数是否是object的方法
        lwjQuery.isObject = function(obj){
            return typeof obj === "object";
        };
        //创建判断传入的参数是否是数组的方法
        lwjQuery.isArray = function(obj){
           if(lwjQuery.isObject(obj) && "length" in obj && lwjQuery.isWindow(obj)){
               return true;
           }else{
               return false;
           }
        };
        //创建判断传入的参数是否是函数的方法
        lwjQuery.isFunction(fn){
            return typeof fn === "function";
        };
        //创建判断传入的参数是否是字符串的方法
        lwjQuery.isString = function (str){
            return typeof str === "string";
        };
        //创建判断是否是代码片段的方法
        lwjQuery.isHTML = function(str){
            return str.charAt(0) == "<" && str.charAt(str.length-1) == ">" && str.length >= 3;
        };        
        //创建去除字符串头尾空格的方法
        lwjQuery.trim = function(str){
            if(!(lwjQuery.isString(str))){
                return str;
            }
            if(str.trim){           //判断是否支持trim方法,IE8以下不支持
                return str.trim();
            }else{
                return str.replace(/^\s+|\s+$/g, "");
            }
        };







        lwjQuery.prototype.init.prototype = lwjQuery.prototype;  //jQuery.fn == jQuery.prototype
        window.lwjQuery = window.$ = lwjQuery;
    })(window);






















