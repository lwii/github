////////////////////////////////////////////----------------������---------------///////////////////////////////////////////////////////
/*
	//ʵ���ۼӣ�����������ָ����ר��addEvent�õ�	
	//JSһ�н�Ϊ��������addEvent.ID�﷨��ȷ��ʵ�����Ǹ�ȫ�ֱ���
	alert(addEvent.ID);
	addEvent.ID++;
*/
//��������
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

//DOM����
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
		//���۲������֣��������ò�����
		/*timer = setInterval(function () {
			if (/loaded|complete/.test(document.readyState)) { 	//loaded�ǲ��ּ��أ��п���ֻ��DOM������ϣ�complete����ȫ���أ�������onload
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

//��������¼���
function addEvent(obj,type,fn){
	if(typeof obj.addEventListener != 'undefined'){					//w3c
		obj.addEventListener(type,fn,false);
	}else{																						//IE
		//����һ������¼��Ĺ�ϣ��ɢ�б�
		if(!obj.events)obj.events = {};								//���obj.events�����ھʹ���һ��obj.events = {}
		//��һ��ִ��ʱִ��
		if(!obj.events[type]){
			//����һ������¼�������������
			obj.events[type] = [];
			//�ѵ�һ�ε��¼��������ȴ��浽��һ��λ����
			if(obj['on' + type]) obj.events[type][0] = fn;
		}else {
			//ͬһ��ע�ắ���������Σ�����ӵ���������
			if(addEvent.equal(obj.events[type], fn)) return false;
		}
		//�ӵڶ��ο�ʼ���¼����������洢
		obj.events[type][addEvent.ID++] = fn;
		//ִ���¼�������
		obj['on' + type] = addEvent.exec;		
	}
}
//Ϊÿһ���¼�����һ��������
addEvent.ID = 1;

//ִ���¼�������
addEvent.exec = function (event){
	var e = event || addEvent.fixEvent(window.event);
	var es = this.events[e.type];
	for(var i in es){
		es[i].call(this,e);
	}
}

//ͬһ��ע�ắ����������
addEvent.equal = function (es,fn){
	for(var i in es){
		if(es[i] == fn) return true;
	}
	return false;
}

//��IE���õ�event����ƥ�䵽W3C��ȥ
addEvent.fixEvent = function(event){
	event.preventDefault = addEvent.fixEvent.preventDefault;
	event.stopPropagation = addEvent.fixEvent.stopPropagation;
	event.target = event.srcElement;
	return event;
}
//IE��ֹĬ����Ϊ
addEvent.fixEvent.preventDefault = function(){
	this.returnValue = false;
}
//IEȡ��ð��
addEvent.fixEvent.stopPropagation = function(){
	this.cancelBubble = true;
}

//��������¼�ɾ��
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

//���������ȡ�ӿڴ�С
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

//���������ȡ������λ��
function getScroll(){
	return {
		top : document.documentElement.scrollTop || document.body.scrollTop,
		left : document.documentElement.scrollLeft || document.body.scrollLeft,
	}
}
//���������ȡStyle
function getstyle(element,attr){
	//return this.elements[i].style[attr];				//��ֻ�ܻ�ȡ������ʽ��ֵ���ⲿ��ʽ��ȡ����
	if(typeof window.getComputedStyle != 'undefined'){							//W3C
		return window.getComputedStyle(element, null)[attr];		//W3C��ȡ�ⲿ��ʽ�������е�ֵ
	}else if(typeof element.currentStyle != 'undefined'){				//IE
		return element.currentStyle[attr];											//IE��ȡ�ⲿ��ʽ�����Ե�ֵ
	}	
}

//�ж�class�Ƿ����
function hasclass(element,className){
	return element.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
} 

//����������link����
function insertrule(sheet,selectText,cssText,position){
	if(typeof sheet.insertRule != 'undefined'){				//W3C
		sheet.insertRule(selectText + '{' + cssText + '}',position);
	}else if(typeof sheet.addRule != 'undefined'){		//IE
		sheet.addRule(selectText,cssText,position);
	}	
}
//��������Ƴ�link����
function deleterule(sheet,index){
	if(typeof sheet.deleteRule != 'undefined'){				//W3C
		sheet.deleteRule(index);
	}else if(typeof sheet.removeRule != 'undefined'){		//IE
		sheet.removeRule(index);
	}	
}
//��ȡEvent����
function getevent(event){
	return event || window.event;
}
//��ֹĬ����Ϊ
function predef(event){
	var e = getevent(event);
	if(typeof e.preventDefault != 'undefined'){									//w3c
		e.preventDefault();
	}else{																								//ie
		e.returnValue = false;													
	}
}
//���������ȡinnerText
function getInnerText(element) {
	return (typeof element.textContent == 'string') ? element.textContent : element.innerText;
}
//�����������innerText
function setInnerText(element,text){
	if(typeof element.textContent == 'string'){
		element.textContent = text;
	}else {
		element.innerText = text;
	}
}
//��ȡĳһ��Ԫ�ص�����㶥��ľ���
function offsetTop (element){
	var top = element.offsetTop;
	var parent = element.offsetParent;
	while (parent != null){
		top += parent.offsetTop;
		parent = parent.offsetParent;
	}
	return top;
}
//ĳһ��ֵ�Ƿ����ĳһ��������
function inArray(array,value){
	for(var i in array){
		if (array[i] === value) return true;
	}
	return false;
}
//ɾ�����ո�
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g , '');
}
//����������
//function scrollTop(){
//	document.documentElement.scrollTop = 0;
//	document.body.scrollTop = 0;
//}
//}
//��ȡĳһ���ڵ����һ���ڵ������
function prevIndex(current,parent){
	var length = parent.children.length;
	if(current == 0) return length -1;
	return parseInt(current) - 1;
}
//��ȡĳһ���ڵ����һ���ڵ������
function nextIndex(current,parent){
	var length = parent.children.length;
	if(current == length - 1) return 0;
	return parseInt(current) + 1;
}
//�������̶�
function fixedScroll(){
	window.scrollTo(fixedScroll.left,fixedScroll.top);
}
//��ֹĬ����Ϊ
function predef (e) {
	e.preventDefault();
}


















