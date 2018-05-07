
/*
//直接获取网页中的值
window.onload = function(){
	alert(document.getElementById('box').innerHTML);
	alert(document.getElementsByName('sex')[0].value);
	alert(document.getElementsByTagName('p')[0].innerHTML);		
}

//通过函数式获取网页中的值
window.onload = function(){
	alert(getid('box').innerHTML);       //   alert($('box').innerHTML);	
	alert(getName('sex')[0].value);
}

//通过对象式获取网页中的值
window.onload = function(){
	alert(Base.getid('box').innerHTML);
	alert(Base.getname('sex')[0].value);
	alert(Base.gettag('p')[0].innerHTML);
}

window.onload = function(){
	Base.getid('box').css('color','red').css('background','black').html('pox').click(function(){
		alert('a');
	});
	//Base是一个基础库的核心对象
	//Base.getid('box')返回的是一个divElement，这个对象没有CSS方法。
	//将Base，getid('box')返回改成Base即可
	//在Base对象中添加css方法，html方法，click方法
}

window.onload = function(){
//封装库-连缀	
	//alert(base.getid('box').elements.length);
	//$().getid('box').css('color','blue').css('background','black');
	//alert(base.gettag('p').elements.length);
	//$().gettag('p').css('color','red').html('poxxx').click(function(){
	//	alert('hello!');
	//});
	
//封装库-CSS
	//alert($().getid('box').html());   					//获取div中的内容
	//alert($().getid('box').css('color'));			//获取div中CSS样式中属性的值
	//alert($().getClass('class_name').elements.length);//获取class属性中所有class_name的数组长度
	//$().getClass('class_name').css('color','blue');		//修改所有class中css样式
	//alert($().getClass('class_name').getElement(2).elements.length);//获取class属性中单个class_name的数组长度
	//$().getClass('class_name').getElement(2).css('color','pink');			//修改单个class中css样式
	//$().getClass('class_name','bbb').css('color','blue');		
	//$().getid('aaa').css('color','red');				//ID为aaa的DIV颜色变成red
	//$().getid('bbb').css('color','blue');				//ID为aaa和ID为bbb的两个DIV颜色变成blue，出现了问题，因为Base.prototype.elements = [];	是公有的。

	//$().getid('aaa').add_class('a').add_class('b').remove_class('a').remove_class('b');//添加和移除class属性的值
	
	//$().remove_rule(0);
}

//传统事件绑定的弊端，值打印出3, 最后一个覆盖了前面两个。
window.onload = function(){
	alert('1');
}
window.onload = function(){
	alert('2');
}
window.onload = function(){
	alert('3');
}
//现在事件绑定
addEvent(window,'load',function(){
	alert('1');
});
addEvent(window,'load',function(){
	alert('2');
});
addEvent(window,'load',function(){
	alert('3');
});

window.onload = function(){
	
	var obutton = document.getElementById('button');
	addEvent(obutton,'click',fn1);
	addEvent(obutton,'click',fn2);
	addEvent(obutton,'click',fn3);
	removeEvent(obutton,'click',fn1);
	
	var a= document.getElementById('a');
	addEvent(a,'click',function(e){
		e.preventDefault();
	});
function fn1(e){
	//alert(e.clientX);
	//alert(this.value);
	alert('1' + this.value + e.clientX);
}
function fn2(e){
	alert('2' + this.value + e.clientX);
}
function fn3(e){
	alert('3' + this.value + e.clientX);
}
}
	//CSS选择器
window.onload = function(){

	//alert($().getid('box').html());
	//$().gettag('span').css('color','red');
	//$().getClass('a').css('color','blue');
	//$('#box').css('color','red').click(function(){
	//	$(this).css('color','pink');
	//});
	//$().getid('box').click(function(){
	//	$(this).css('color','pink');
	//});	
	//$().getClass('a').css('color','blue');
	//$('p').css('color','yellow');
	//$('p').find('span').css('color','red');
	//$('p').find('.a').css('color','red');
	//$('p').find('#c').css('color','pink');
	$('box p .a').css('color','red');
}

//浏览器检测
function getState(){
	alert('');
}
getState();							//需要调用一下，比较多余

alert('');								//直接写到全局里，比较混乱
(function (){						//闭包
	window.sys = {};														//让外部可以访问，保存浏览器信息对象
	var ua = navigator.userAgent.toLowerCase(); 	//navigator.userAgent获取浏览器信息字符串，toLowerCase() 方法用于把字符串转换为小写。
	var s ;																			//浏览器信息数组，浏览器名称+版本
	
	//alert(ua);
	//alert(ua.match(/msie ([\d.]+)/));
	//alert(ua.match(/firefox\/([\d.]+)/));		
	if ((/msie ([\d.]+)/).test(ua)) {
		s = ua.match(/msie ([\d.]+)/);
		sys.ie = s[1];
	}
	
	if ((/firefox\/([\d.]+)/).test(ua)) {
		s = ua.match(/firefox\/([\d.]+)/);
		sys.firefox = s[1];
	}
	
	if ((/chrome\/([\d.]+)/).test(ua)) {
		s = ua.match(/chrome\/([\d.]+)/);
		sys.chrome = s[1];
	}
	
	if ((/opera\/.*version\/([\d.]+)/).test(ua)) {
		s = ua.match(/opera\/.*version\/([\d.]+)/);
		sys.opera = s[1];
	}
	
	if ((/version\/([\d.]+).*safari/).test(ua)) {
		s = ua.match(/version\/([\d.]+).*safari/);
		sys.safari = s[1];
	}
})();

alert(sys.firefox);




//传统DOM加载
window.onload = function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
}
//PS:如果有图片，那么要等图片加载完成之后在执行onload事件，
//现在DOM加载
addEvent(document,'DOMContentLoaded',function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
});
//PS:如果有图片，先执行节点操作的内容，然后在缓缓加载图片，也就是说，当DOM数结构加载完成后即可执行了
//PS：IE使用传统也就是图片加载完毕后再执行DOM节点操作，IE6，7，8不支持DOMContentLoaded


//IE6，7，8模拟DOMContentLoaded
document.write('<script id = 'ie_loaded' defer='defer' src='javascript:void(0)'></script>');
var ie_loaded = document.getElementById('ie_loaded');
ie_loaded.onreadystatechange = function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
}
//ps:有效，DOM加载完毕后执行了节点操作，并且后面才加载完毕图片
//PS：缺陷：如果有iframe标签，那么这种方法就会等待iframe里面的内容加载完毕才能执行节点

//使用ｄｏＳｃｒｏｌｌ
var timer = null;
timer = setInterval(function(){
	try{
		document.documentElement.doScroll('left');
		var box = document.getElementById('box');
		alert(box.innerHTML);
	}catch(e){
		
	}
});

function addDomLoaded(fn){
	if(document.addEventListener){                 //W3C
		addEvent(document,'DOMContentLoaded',function(){
			fn();
			removeEvent(document,'DOMContentLoaded',arguments.callee);
		});
	}else{																		//IE
		var timer = null;
		timer = setInterval(function(){
			try{
				document.documentElement.doScroll('left');
				var box = document.getElementById('box');
				alert(box.innerHTML);
			}catch(e){
				
			}
		});
	}
}
addDomLoaded(function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
});

var isReady = false;
var timer = null;
function doReady(fn){
	if(timer) clearInterval(timer);
	if(isReady) return;
	isReady = true;
	fn();
}
function addDomLoaded(fn){
	//这种方法，目前在主流浏览器半段都是complete，类似onload，ji图片加载后加载
	//用于非主流浏览器的向下兼容即可
	timer = setInterval(function(fn){
		if(/loaded|complete/.test(document.readyState)){   //loaded是部分加载，有可能只是DOM加载完毕，complete是全部加载完毕，相当于onload
		doReady(fn);
		}
	},1);
}
addDomLoaded(function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);	
});

addDomLoaded(function () {
	var box = document.getElementById('box');
	alert(box.innerHTML);
});

//动画初探
$(function(){
	var box = document.getElementById('box');
	//alert(parseInt(getstyle(box,'left')));
	setInterval(function(){
		box.style.left = parseInt(getstyle(box,'left')) + 1 +'px';
	},50);
	//box.style.left = 500 + 'px';
});

$(function(){
	$('#button').click(function(){
		$('#box').animate({
			'attr' : 'x',
			'start' : 100,
			//'alter' : 200,
			'target': 300,
			'step' : 7,
			//'speed':10,
			//'type' : 0,
		});
	
	});
});
*/
//
$(function(){
	$("#button").toggle(function(){
		$("#box").css('background','blue');
	},function(){
		$("#box").css('background','red');
	});
});














