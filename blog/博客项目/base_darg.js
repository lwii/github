
//拖拽插件
$().extend('drag',function(){
		for(var i = 0; i < this.elements.length; i++){
		//this.elements[i].onmousedown = function(e){						//鼠标点击事件
		addEvent(this.elements[i],'mousedown',function(e){			
		//predef(e);
		//var e = getevent(e);
		if(trim(this.innerHTML).length == 0)e.preventDefault();
		var _this = this;
		//alert(e.clientX);														//e.clientX得到鼠标点击的位子到页面左边的距离
		//alert(odiv.offsetLeft);											//odiv.offsetLeft得到鼠标点击后块的左边到页面左边的距离
		var deffx = e.clientX - _this.offsetLeft;					//得到鼠标点击的点到块左边的距离
		var deffy = e.clientY - _this.offsetTop;					//得到鼠标点击的点到块上边的距离
		//document.onmousemove = function(e){				//传统事件绑定
		//自定义拖拽区域
		//var flag = false;
		//for(var i = 0 ; i < tags.length; i++){
		//	if(e.target == tags[i]){							//只有有一个是true，就立刻返回
		//		flag = true;
		//		break;
		//	}
		//}
		if(e.target.tagName == 'H2'){
			addEvent(document,'mousemove',move);
			addEvent(document,'mouseup',up);
		}else{
			removeEvent(document,'mousemove',move);
			removeEvent(document,'mouseup',up);
		}			
		//}			
		function move(e){
			//var e = getevent(e);
			//var e = getevent(e);
			var left = e.clientX - deffx;
			var top1 = e.clientY - deffy;
			if(left < 0){													
				left = 0;																					//控制拖拽不能出左边页面
			}else if (left <= getScroll().left){
				left = getScroll().left;
			}else if(left > getinner().width + getScroll().left - _this.offsetWidth){
				left  = getinner().width + getScroll().left - _this.offsetWidth;							//控制拖拽不能出右边页面		
			}
			
			if(top1 < 0){
				top1 = 0;																					//控制拖拽不能出上边页面						
			}else if (top1 <= getScroll().top){
				top1 = getScroll().top;
			}else if(top1 > getinner().height  + getScroll().top - _this.offsetHeight){
				top1 = getinner().height  + getScroll().top - _this.offsetHeight;						//控制拖拽不能出下边页面		
			}
			_this.style.left = left  + 'px';
			_this.style.top = top1 + 'px';	
			if(typeof _this.setCapture != 'undefined'){
				_this.setCapture();
			}
		}
		function up(){
				//document.onmousemove = null;
			removeEvent(document,'mousemove',move);
			removeEvent(document,'mouseup',up);
			if(typeof _this.releaseCapture != 'undefined'){
				_this.releaseCapture();
			}
		}
	//}	
	});
	}
	return this;
});
