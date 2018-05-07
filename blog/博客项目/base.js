/*
//函数式
function getid(id){												//function $(id){
	return document.getElementById(id);		//	return document.getElementById(id);
}																			//}
function getName(name){
	return document.getElementsByName(name);
}

//对象式封装
var Base = {
	getid:function (id){
		return document.getElementById(id);
	},	
	getname:function (name){
		return document.getElementsByName(name);
	},	
	gettag:function (tag){
		return document.getElementsByTagName(tag);
	}
};
*/
////////////////////////////////////////////----------------功能库---------------///////////////////////////////////////////////////////
//前台调用
var $ = function(args){
	return new Base(args);
}
//类库
function Base(args){
	this.elements = []; 														//私有属性，就不会出现问题了
	if(typeof args == 'string'){
		//CSS模拟
		if(args.indexOf(' ') != -1){			//indexOf() 方法可返回某个指定的字符串值在字符串中首次出现的位置。
			var elements = args.split(' ');		//把节点拆开分别保存到数组里面去。split() 方法用于把一个字符串分割成字符串数组。
			var childElements = [];					//存放临时节点对象的数组，解决被覆盖的问题	
			var node = [];								//用来存放父节点用的
			for(var i = 0 ; i < elements.length; i++){
				if(node.length == 0) node.push(document);	 //如果父节点为空的话，就把document放到node数组中
				switch(elements[i].charAt(0)){											//charAt() 方法可返回指定位置的字符
				case '#':
					childElements = []; 				//清理掉临时节点，以便父节点失效，子节点有效
					childElements.push(this.getid(elements[i].substring(1)));
					node = childElements;			//保存父节点，因为childElements要清理，
					break;
				case '.':
					childElements = [];
					for(var j = 0; j < node.length; j++){
						var temps = this.getClass(elements[i].substring(1),node[j]);
						for(var k = 0; k < temps.length; k++){
							childElements.push(temps[k]);
						}
					}
					node = childElements;
					break;
				default:
					childElements = [];
					for(var j = 0; j < node.length; j++){
						var temps = this.gettag(elements[i],node[j]);
						for(var k = 0; k < temps.length; k++){
							childElements.push(temps[k]);
						}
					}
					node = childElements;
				}
			}
			this.elements = childElements;
		}else{
		//find模拟
			switch(args.charAt(0)){											//charAt() 方法可返回指定位置的字符
				case '#':
					this.elements.push(this.getid(args.substring(1)));								//substring() 方法用于提取字符串中介于两个指定下标之间的字符。
					break;
				case '.':
					this.elements = this.getClass(args.substring(1));
					break;
				default:
					this.elements = this.gettag(args);
			}
		}
	}else if(typeof args == 'object'){				
		if(args != 'undefined'){
			this.elements[0] = args;
		}
	}else if(typeof args == 'function'){
		//addDomLoaded(args);		//直接在Base里面调用addDomLoaded函数
		this.ready(args);			//在Base里面调用ready函数，然后在ready函数里面调用addDomLoaded函数
	}
}

Base.prototype.ready = function(fn){
	addDomLoaded(fn);					//在ready函数里面调用addDomLoaded函数
}

//Base.prototype.elements = [];										//公有的
	//获取ID节点
Base.prototype.getid = function(id){
	return document.getElementById(id);				//push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。
};
	//获取标签节点数组
Base.prototype.gettag = function(tag,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var tags = node.getElementsByTagName(tag);
	for(var i=0; i < tags.length; i++){
		temps.push(tags[i]);
	}
	return temps;
}
	//获取CLASS节点数组
Base.prototype.getClass = function(className,parentNode){
	var node = null;
	var temps = [];
	if(parentNode != undefined){
		node = parentNode;
	}else{
		node = document;
	}
	var all_class = node.getElementsByTagName('*');		//获取所有节点
	 for(var i = 0; i < all_class.length; i++){										
		 //if(all_class[i].className == className){
		 if((new RegExp('(\\s|^)' + className + '(\\s|$)')).test(all_class[i].className)){
			 temps.push(all_class[i]);
		 }
	 }
	 return temps;
}	
//设置CSS选择器子节点
Base.prototype.find = function(str){
	var childElements = [];
	for(var i = 0; i < this.elements.length; i++){
		switch(str.charAt(0)){
			case '#' :
				childElements.push(this.getid(str.substring(1)));
				break;
			case '.' :				
				var all_class = this.getClass(str.substring(1),this.elements[i]);		//获取所有节点
				 for(var j = 0; j < all_class.length; j++){										
					 if(all_class[j].className == str.substring(1)){
						 childElements.push(all_class[j]);
					 }
				 }
				break;
			default:
				var tags = this.gettag(str,this.elements[i]);
				for(var j = 0; j < tags.length; j++){
					childElements.push(tags[j]);
				}
		}
	}
	this.elements = childElements;
	return this;
}
//获取某个节点，并返回这个节点对象
Base.prototype.ge = function(num){
	return this.elements[num];
}
//获取首个节点对象，并返回这个节点
Base.prototype.first = function(){
	return this.elements[0];
}
//获取最后一个节点，并返回这个节点对象
Base.prototype.last = function(){
	return this.elements[this.elements.length - 1];
}
//获取某组节点的数量
Base.prototype.length = function(){
	return this.elements.length;
}
//获取某个节点的属性
Base.prototype.attr = function(attr,value){
	for(var i = 0 ; i < this.elements.length; i++){
		if(arguments.length == 1){
			return this.elements[i].getAttribute(attr);
		}else if(arguments.length == 2){
			this.elements[i].setAttribute(attr,value);
		}		
	}
	return this;
}
//获取某个节点在整个节点组中是第几个索引
Base.prototype.index = function(){
	var children = this.elements[0].parentNode.children; //获取付节点的所有子节点的集合
	for(var i = 0 ; i < children.length; i++){
		if(this.elements[0] == children[i]) return i;
	}	
}
//设置某一个节点的透明度
Base.prototype.opacity = function(num){
	for(var i= 0 ; i < this.elements.length; i++){
		this.elements[i].style.opacity = num / 100;			//非IE设置透明度
		//this.elements[i].style.filter = 'alpha(opacity=' + num + ')';  //IE设置透明度
	}
	return this;
}
//获取某一个节点,并返回这个节点对象
Base.prototype.getElement = function(num){
	var ele = this.elements[num];
	this.elements = [];
	this.elements[0] = ele;
	return this;
}
//获取当前节点的下一个元素节点
Base.prototype.next = function(){
	for(var i = 0 ; i < this.elements.length ; i++){
		this.elements[i] = this.elements[i].nextSibling;
		if (this.elements[i] == null) throw new Error('找不到下一个同级元素节点');
		if (this.elements[i].nodeType == 3) this.next();
	}
	return this;
}
//获取当前节点的上一个元素节点
Base.prototype.prev = function(){
	for(var i = 0 ; i < this.elements.length ; i++){
		this.elements[i] = this.elements[i].previousSibling;
		if (this.elements[i] == null) throw new Error('找不到上一个同级元素节点');
		if (this.elements[i].nodeType == 3) this.prev();
	}
	return this;
}
//设置CSS样式
Base.prototype.css = function(attr,value){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 1){
			return getstyle(this.elements[i],attr);
		}
		this.elements[i].style[attr] = value;
	}	
	return this;
}
//添加Class
Base.prototype.add_class = function(className){
	for(var i = 0; i<this.elements.length; i++){
		if(!hasclass(this.elements[i],className)){
			this.elements[i].className += ' ' + className;
		}		
	}
	return this;
}
//移除CLASS
Base.prototype.remove_class = function(className) {
	for(var i=0; i < this.elements.length; i++){
		if(hasclass(this.elements[i],className)){
			this.elements[i].className = this.elements[i].className.replace(new RegExp('(\\s|^)' + className + '(\\s|$)'),' ');
		}
	}
	return this;
}
//添加link或style的css规则
Base.prototype.add_rule = function (num,selectText,cssText,position){
	var sheet = document.styleSheets[num];
	insertrule(sheet,selectText,cssText,position);
	return this;
}
//移除link或style的css规则
Base.prototype.remove_rule = function (num,index){
	var sheet = document.styleSheets[num];
	deleterule(sheet,index);
	return this;
}
//设置表单字段元素
Base.prototype.form = function(name){
	for(var i = 0 ; i < this.elements.length; i++){
		this.elements[i] = this.elements[i][name];
	}
	return this;
}
//设置表单字段内容获取
Base.prototype.value = function(str){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].value;
		}
		this.elements[i].value = str;
	}
	return this;
}
//设置innhtml
Base.prototype.html = function(str){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return this.elements[i].innerHTML;
		}
		this.elements[i].innerHTML = str;
	}
	return this;
}
//设置innText
Base.prototype.Text = function(str){
	for(var i = 0; i < this.elements.length; i++){
		if(arguments.length == 0){
			return getInnerText(this.elements[i]);
		}
		setInnerText(this.elements[i],str);
	}
	return this;
}
//设置事件发生器
Base.prototype.bind = function(event,fn){
	for(var i = 0; i < this.elements.length; i++){
		addEvent(this.elements[i], event, fn);
	}
	return this;	
}
//设置鼠标移入移出方法
Base.prototype.hover = function(over,out){
	for(var i=0; i<this.elements.length; i++){
			//传统事件绑定
		//this.elements[i].onmouseover = over;
		//this.elements[i].onmouseout = out;
			//现代事件绑定
		addEvent(this.elements[i],'mouseover',over);
		addEvent(this.elements[i],'mouseout',out);
	}
	return this;
}
//设置点击切换方法
Base.prototype.toggle = function(){
	for(var i = 0 ; i < this.elements.length; i++){
		(function(element,args){														//闭包
			var count = 0;
			addEvent(element,'click',function (){
				args[count++ % args.length].call(this);	
			});
		})(this.elements[i],arguments);
		//arguments[0]();															//刷新就变蓝
		//var count = 0;																//计数器
		//var args = arguments;
		//addEvent(this.elements[i],'click',function (){
			//arguments[count]();											//arguments不等于上面的arguments，作用域的问题
		//	args[count++ % args.length].call(this);										
			//count ++;
			//if(count >= args.length) count = 0;							//
		//});
	}
	return this;
}
//设置 鼠标移入显示下拉菜单
Base.prototype.show = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'block';
	}
	return this;
}
//设置 鼠标移出隐藏下拉菜单
Base.prototype.hide = function(){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].style.display = 'none';
	}
	return this;
}
//设置物体居中
Base.prototype.center = function(width,height){
	var top1 = (getinner().height - height) / 2 + getScroll().top;
	var left = (getinner().width  - width) / 2 + getScroll().left ;
	for(var i = 0 ; i < this.elements.length; i++){
		this.elements[i].style.top = top1 + 'px';
		this.elements[i].style.left = left + 'px';
	}
	return this;
}
//锁屏功能
Base.prototype.lock = function() {
	for(var i = 0 ; i < this.elements.length; i++){
		fixedScroll.top = getScroll().top;
		fixedScroll.left = getScroll().left;
		this.elements[i].style.width = getinner().width+ getScroll().left + 'px';    		//可视页面的宽度+滚动以后的宽度
		this.elements[i].style.height = getinner().height + getScroll().top + 'px'; 		//可视页面的高度+滚动以后的高度
		this.elements[i].style.display = 'block';
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'hidden' : document.documentElement.style.overflow = 'hidden';
		addEvent(this.elements[i],'mousedown',predef);
		addEvent(this.elements[i],'mouseup',predef);
		addEvent(this.elements[i],'selectstart',predef);
		addEvent(window,'scroll',fixedScroll);
	}
	return this;
}
//解锁屏功能
Base.prototype.unlock = function(){
	for(var i = 0 ; i < this.elements.length; i++){
		this.elements[i].style.display = 'none';
		parseFloat(sys.firefox) < 4 ? document.body.style.overflow = 'auto' : document.documentElement.style.overflow = 'auto';
		//removeEvent(window,'srcoll',scrollTop);
		removeEvent(this.elements[i],'mousedown',predef);
		removeEvent(this.elements[i],'mouseup',predef);
		removeEvent(this.elements[i],'selectstart',predef);
		removeEvent(window,'scroll',fixedScroll);
	}
	return this;
}
//触发点击事件
Base.prototype.click = function(fn){
	for(var i = 0; i < this.elements.length; i++){
		this.elements[i].onclick = fn;		
	}
	return this;
}
//触发浏览器窗口事件
Base.prototype.resize = function(fn){
	for(var i=0;i<this.elements.length; i++){
		var ele = this.elements[i];
		 /*  //传统事件绑定
		window.onresize = function(){
			fn();
			if(ele.offsetLeft > getinner().width - ele.offsetWidth){
				ele.style.left = getinner().width - ele.offsetWidth + 'px';
			}else if(ele.offsetTop > getinner().height - ele.offsetHeight){
				ele.style.top = getinner().height - ele.offsetHeight + 'px';
			}
		}
		*/
		//现代事件绑定
		addEvent(window,'resize',function(){
			fn();
			if(ele.offsetLeft > getinner().width + getScroll().left - ele.offsetWidth){
				ele.style.left = getinner().width + getScroll().left - ele.offsetWidth + 'px';
				if(ele.offsetLeft <= 0 + getScroll().left){					//防止边部溢出
					ele.style.left = 0 + getScroll().left + "px";
				}
			}
			if(ele.offsetTop > getinner().height + getScroll().top - ele.offsetHeight){
				ele.style.top = getinner().height + getScroll().top - ele.offsetHeight + 'px';
				if(ele.offsetTop <= 0 + getScroll().top){					//防止顶部溢出
					ele.style.top = 0 + getScroll().top + "px";
				}
			}
		});
		
	}	
	return this;
}
//拖拽事件
//Base.prototype.drag = function(){}

//设置动画
Base.prototype.animate = function(obj){
	for(var i = 0; i < this.elements.length; i++){
		var ele = this.elements[i];
		var attr = obj['attr'] =='x' ? 'left' : obj['attr'] == 'y' ? 'top' :
						 obj['attr'] == 'w' ? 'width' : obj['attr'] == 'h' ? 'height' : 
						 obj['attr'] == 'o' ? 'opacity' : obj['attr'] != undefined ? obj['attr'] : 'left';               //可选，left和top两种值，不传递则默认left
		var start = obj['start'] != undefined ? obj['start'] : 
							attr == 'opacity' ? parseFloat(getstyle(ele,attr)) * 100 : 
													      parseInt(getstyle(ele,attr));//可选，默认是css的起始值
		var t = obj['t'] != undefined ? obj['t'] : 10;														   //可选，默认50毫秒执行一次
		var step = obj['step'] != undefined ? obj['step'] : 20;										   //可选，每次运行5像素
		//var target = obj['alter'] + start;																			   //必选，运行的目标点；
		
		var speed = obj['speed'] != undefined ? obj['speed'] :6;								   //可选，默认缓冲速度为6
		var type = obj['type'] == 0 ? 'constant' : obj['type'] == 1 ? 'buffer' : 'buffer';   //可选，0表示匀速，1表示缓冲，默认缓冲
		
		var alter = obj['alter'];
		var target = obj['target'];
		var mul = obj['mul'];
		if(alter != undefined && target == undefined){
			target = alter + start;
		}else if(alter == undefined && target == undefined && mul == undefined ){
			throw new Error(alert('alter增量或target目标量必须传一个'));
		}
		if(start > target) step = -step;
		if(attr == 'opacity'){
			ele.style.opacity = parseInt(start) / 100;
			ele.style.filter = 'alpha(opacity=' + parseInt(start) + ')';
		}else{
			//ele.style[attr] = start + 'px';
		}
		
		
		if(mul == undefined){  				//如果没有mul这个对象的话 就创建一个mul对象，然后把得到的target保存到mul对象。
			mul = {};
			mul[attr] = target;
		}
		clearInterval(ele.timer);					//执行前先清空，就不会出现一直累加的情况
		 ele.timer = setInterval(function(){
			 /*
			 问题1：多个动画执行了多个列队动画，我们要求不管多少个动画只执行一歌列队动画
			 问题2：多个列队动画数值差别太大时，导致动画无法执行到目标值，原因是定时器提前清理了。
			 
			 解决1：不管多少个动画，只提供一次列队动画的机会
			 解决2：多个动画按照最后一个分动画执行完毕后再清理即可。
			 */
			 //创建一个布尔值，这个值可以了解多个动画是否全部执行完毕
			 var flag = true;  //表示执行完毕了
			 for(var i in mul){
				 attr = i == 'x' ? 'left' : i == 'y' ? 'top' : i == 'w' ? 'width' : i == 'h' ? 'height' : i == 'o' ? 'opacity' : i != undefined ? i : 'left';
				 target = mul[i];			 
				 if(type == 'buffer'){
					 step = attr == 'opacity' ? (target - parseFloat(getstyle(ele,attr))*100) / speed :
															  (target - parseInt(getstyle(ele,attr))) / speed;
					 step = step > 0 ? Math.ceil(step) : Math.floor(step);
				 }
				//如果放在else后面，会慢一拍，所以会后退一下
				//如果放在if前面，当值超过target的时候同时减到target的值，这个时候就看不到减去的过程
				//ele.style[attr] = parseInt(getstyle(ele,attr)) + step + 'px';
				if(attr == 'opacity'){																//透明度变化
					var temp = parseFloat(getstyle(ele,attr))*100;
					if(step == 0){
						setOpacity();
					}else if(step > 0 && Math.abs(parseFloat(getstyle(ele,attr)) *100- target) <= step) {
						setOpacity();
					}else if(step < 0 && (parseFloat(getstyle(ele,attr)) * 100 - target) <= Math.abs(step)){
						setOpacity();
					}else{
						ele.style.opacity = parseInt(temp + step) / 100;
						ele.style.opacity = 'alpha(opacity = '+ parseInt(temp+ step) +')';
					}
					if(parseInt(target) != parseInt(parseFloat(getstyle(ele,attr)) * 100)) flag = false;
				}else{																						//运动变化
					if(step == 0){
						settarget();
					}else if(step > 0 && Math.abs(parseInt(getstyle(ele,attr)) - target) <= step) {
						settarget();
					}else if(step < 0 && (parseInt(getstyle(ele,attr)) - target) <= Math.abs(step)){
						settarget();
					}else{
					
						//放在else永远不会和停止运动同时执行，就不会出现同时的问题
						//但是会出现不同时减到target值的问题，导致突兀
						ele.style[attr] = parseInt(getstyle(ele,attr)) + step + 'px';
					}
					if(parseInt(target) != parseInt(getstyle(ele,attr)))  flag = false;
				}
			}
			if(flag){
				clearInterval(ele.timer);
				if(obj.fn != undefined) obj.fn();
			}
			//document.getElementById('aaa').innerHTML += getstyle(ele,attr) + '<br />';
			//document.getElementById('aaa').innerHTML += step + '<br />';
			//document.getElementById('test').innerHTML += i + '--' + parseInt(target) + '--' + parseInt(getstyle(ele, attr)) + '--' + flag + '<br />';
		},t);
		//动画
		function settarget(){
			ele.style[attr] = target + 'px';

		}
		//透明度
		function setOpacity(){
			ele.style.opacity = parseInt(target);
			ele.style.filter = 'alpha(opacity=' + parseInt(target) + ')';

		}
	}
	return this;
}
//拖拽插件入口
Base.prototype.extend = function(name,fn){
	Base.prototype[name] = fn;								//拖拽插件
}
















































































