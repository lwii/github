////////////////////////////////////////////----------------基础库---------------///////////////////////////////////////////////////////
/*
	//实现累加，并且清晰的指出是专给addEvent用的	
	//JS一切皆为对象，所以addEvent.ID语法正确，实际上是个全局变量
	alert(addEvent.ID);
	addEvent.ID++;
*/
//浏览器检测
(function () {
	window.sys = {};
	var ua = navigator.userAgent.toLowerCase();	
	var s;		
	(s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1] :
	(s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1] :
	(s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1] : 
	(s = ua.match(/opera\/.*version\/([\d.]+)/)) ? sys.opera = s[1] : 
	(s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;
	
	if (/webkit/.test(ua)) sys.webkit = ua.match(/webkit\/([\d.]+)/)[1];
})();

//DOM加载
function addDomLoaded(fn) {
	var isReady = false;
	var timer = null;
	function doReady() {
		if (timer) clearInterval(timer);
		if (isReady) return;
		isReady = true;
		fn();
	}
	
	if ((sys.opera && sys.opera < 9) || (sys.firefox && sys.firefox < 3) || (sys.webkit && sys.webkit < 525)) {
		//无论采用哪种，基本上用不着了
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded是部分加载，有可能只是DOM加载完毕，complete是完全加载，类似于onload
				doReady();
			}
		}, 1);*/

		timer = setInterval(function () {
			if (document && document.getElementById && document.getElementsByTagName && document.body) {
				doReady();
			}
		}, 1);
	} else if (document.addEventListener) {//W3C
		addEvent(document, 'DOMContentLoaded', function () {
			fn();
			removeEvent(document, 'DOMContentLoaded', arguments.callee);
		});
	} else if (sys.ie && sys.ie < 9){
		var timer = null;
		timer = setInterval(function () {
			try {
				document.documentElement.doScroll('left');
				doReady();
			} catch (e) {};
		}, 1);
	}
}

//跨浏览器事件绑定
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){					//w3c
		obj.addEventListener(type,fn,false);
	}else{																						//IE
		//创建一个存放事件的哈希表（散列表）
		if(!obj.events)obj.events = {};								//如果obj.events不存在就创建一个obj.events = {}
		//第一次执行时执行
		if(!obj.events[type]){
			//创建一个存放事件处理函数的数组
			obj.events[type] = [];
			//把第一次的事件处理函数先储存到第一个位子上
			if(obj['on' + type]) obj.events[type][0] = fn;
		}else {
			//同一个注册函数进行屏蔽，不添加到计数器中
			if(addEvent.equal(obj.events[type], fn)) return false;
		}
		//从第二次开始用事件计数器来存储
		obj.events[type][addEvent.ID++] = fn;
		//执行事件处理函数
		obj['on' + type] = addEvent.exec;		
	}
}
//为每一个事件分配一个计数器
addEvent.ID = 1;

//执行事件处理函数
addEvent.exec = function (event){
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
}

//同一个注册函数进行屏蔽
addEvent.equal = function (es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
}

//把IE常用的event对象匹配到W3C中去
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}
//IE阻止默认行为
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}
//IE取消冒泡
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}

//跨浏览器事件删除
function removeEvent(obj,type,fn){
	if(typeof obj.removeEventListener != 'undefined'){
		obj.removeEventListener(type,fn,false);		
	}else {
		if(obj.events){
			for(var i in obj.events[type]){
				if(obj.events[type][i] == fn){
					delete obj.events[type][i];
				}
			}
		}		
	}
}

//跨浏览器获取视口大小
function getinner(){
	if(typeof window.innerWidth != 'undefined'){
		return {
			width:window.innerWidth,
			height:window.innerHeight
		}
	}else {
		return {
			width:document.documentElement.clientWidth,
			height:document.documentElement.clientHeight
		}
	}
}

//跨浏览器获取滚动条位子
function getScroll(){
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft,
	}
}
//跨浏览器获取Style
function getstyle(element,attr){
	//return this.elements[i].style[attr];				//这只能获取行内样式的值，外部样式获取不到
	if(typeof window.getComputedStyle != 'undefined'){							//W3C
		return window.getComputedStyle(element, null)[attr];		//W3C获取外部样式表属性中的值
	}else if(typeof element.currentStyle != 'undefined'){				//IE
		return element.currentStyle[attr];											//IE获取外部样式表属性的值
	}	
}

//判断class是否存在
function hasclass(element,className){
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
} 

//跨浏览器添加link规则
function insertrule(sheet,selectText,cssText,position){
	if(typeof sheet.insertRule != 'undefined'){				//W3C
		sheet.insertRule(selectText + '{' + cssText + '}',position);
	}else if(typeof sheet.addRule != 'undefined'){		//IE
		sheet.addRule(selectText,cssText,position);
	}	
}
//跨浏览器移除link规则
function deleterule(sheet,index){
	if(typeof sheet.deleteRule != 'undefined'){				//W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){		//IE
		sheet.removeRule(index);
	}	
}
//获取Event对象
function getevent(event){
	return event || window.event;
}
//阻止默认行为
function predef(event){
	var e = getevent(event);
	if(typeof e.preventDefault != 'undefined'){									//w3c
		e.preventDefault();
	}else{																								//ie
		e.returnValue = false;													
	}
}
//跨浏览器获取innerText
function getInnerText(element) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
//跨浏览器设置innerText
function setInnerText(element,text){
	if(typeof element.textContent == 'string'){
		element.textContent = text;
	}else {
		element.innerText = text;
	}
}
//获取某一个元素到最外层顶点的距离
function offsetTop (element){
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while (parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}
//某一个值是否存在某一个数组中
function inArray(array,value){
	for(var i in array){
		if (array[i] === value) return true;
	}
	return false;
}
//删除左后空格
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g , '');
}
//滚动条清零
//function scrollTop(){
//	document.documentElement.scrollTop = 0;
//	document.body.scrollTop = 0;
//}
//}
//获取某一个节点的上一个节点的索引
function prevIndex(current,parent){
	var length = parent.children.length;
	if(current == 0) return length -1;
	return parseInt(current) - 1;
}
//获取某一个节点的下一个节点的索引
function nextIndex(current,parent){
	var length = parent.children.length;
	if(current == length - 1) return 0;
	return parseInt(current) + 1;
}
//滚动条固定
function fixedScroll(){
	window.scrollTo(fixedScroll.left,fixedScroll.top);
}
//阻止默认行为
function predef (e) {
	e.preventDefault();
}


















