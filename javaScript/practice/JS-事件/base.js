// JavaScript Document
//封装库，

//封装滚轮函数，返回的是向上还是向下、
function wheel(callBack){
	//判断浏览器是不是火狐
	var str = window.navigator.userAgent;	//得到浏览器信息
	var down = false;                       //判断滚轮向上还是向下滚动 false向上，true向下
	if(str.indexOf("Firefox") != -1) {		//判断str里面的值不等于-1时，就是火狐浏览器
		window.addEventListener("DOMMouseScroll",function(e){
			var ev = e || window.event;
			if(ev.detail < 0){
				down = false;
			}else{
				down = true;
			}
			if(callBack){						//判断传过来的函数存不存在
				//函数回调，将正确的方向结果返回给
				callBack(down);
			}
		},false);
	}else{									//非火狐浏览器				
		window.onmousewheel = function(e){
			var ev = e || window.event;
			if(ev.wheelDelta < 0){
				down = true
			}else{
				down = false;
			}
			if(callBack){						//判断传过来的函数存不存在
				//函数回调，将正确的方向结果返回给
				callBack(down);
			}
		}
	}
	//return down;
}

//封装碰撞检测函数
function collision(obj1,obj2,fn1,fn2){
	obj1.onmousedown = function(e){		//碰撞物体鼠标按下事件
		var ev = e || window.event;
		var offX = ev.offsetX;				//得到自身X轴的位子
		var offY = ev.offsetY;				//得到自身Y轴的位子
		document.onmousemove = function(e){	//碰撞物体鼠标移动事件
			var ev = e || window.event;
			var cliX = ev.clientX;			//得到浏览器X轴的位子
			var cliY = ev.clientY;			//得到浏览器Y轴的位子
			obj1.style.left = cliX - offX + "px";	//自身移动X轴的位子
			obj1.style.top = cliY - offY + "px";		//自身移动Y轴的位子
			if(getClass(obj1,"borderRadius") == "50%" && getClass(obj2,"borderRadius") == "50%"){			//判断图形是不是圆形
				 //用圆1的偏离量+园1的半径 - 园2的偏移量 + 园2的半径
				var num = (first.offsetLeft + first.offsetWidth/2) - (second.offsetLeft + second.offsetWidth/2);		//左偏移量
				var num1 = (first.offsetTop + first.offsetHeight/2) - (second.offsetTop + second.offsetHeight/2);		//上偏移量
				var a = Math.sqrt(num*num + num1*num1);			//勾股定理求两个圆的圆心距离
				if(a <= first.offsetWidth/2 + second.offsetWidth/2 ){
					if(fn1){	
						fn1();				//函数回调
					}	
				}else{
					if(fn2){	
						fn2();				//函数回调
					}	
				}
			}else{
				//左右碰撞
				var minX = obj2.offsetLeft - obj1.offsetWidth;		//获得被碰撞X轴最小的值
				var maxX = obj2.offsetLeft + obj2.offsetWidth;		//获得被碰撞X轴最大的值
				var minY = obj2.offsetTop - obj1.offsetHeight;		//获得被碰撞Y轴最小的值
				var maxY = obj2.offsetTop + obj2.offsetHeight;		//获得被碰撞Y轴最大的值
				
				if(obj1.offsetLeft >= minX && obj1.offsetLeft <= maxX && 
				obj1.offsetTop >= minY && obj1.offsetTop <= maxY){			//碰撞后执行的回调函数
					if(fn1){	
						fn1();				//函数回调
					}			
				}else{
					if(fn2){					//没有碰撞执行的回调函数
						fn2();
					}
				}
			}
		}
	}
	obj1.onmouseup = function(){			//碰撞物体鼠标抬起事件
		document.onmousemove = null;		//碰撞物体鼠标抬起后就停止移动
	}
}
//获取元素属性的返回值
function getClass(obj,name){
	if(obj.currentStyle){			//IE
		return obj.currentStyle[name];
	}else{							//W3C
		return getComputedStyle(obj,false)[name];
	}
}


























