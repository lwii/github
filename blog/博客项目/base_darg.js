
//��ק���
$().extend('drag',function(){
		for(var i = 0; i < this.elements.length; i++){
		//this.elements[i].onmousedown = function(e){						//������¼�
		addEvent(this.elements[i],'mousedown',function(e){			
		//predef(e);
		//var e = getevent(e);
		if(trim(this.innerHTML).length == 0)e.preventDefault();
		var _this = this;
		//alert(e.clientX);														//e.clientX�õ��������λ�ӵ�ҳ����ߵľ���
		//alert(odiv.offsetLeft);											//odiv.offsetLeft�õ������������ߵ�ҳ����ߵľ���
		var deffx = e.clientX - _this.offsetLeft;					//�õ�������ĵ㵽����ߵľ���
		var deffy = e.clientY - _this.offsetTop;					//�õ�������ĵ㵽���ϱߵľ���
		//document.onmousemove = function(e){				//��ͳ�¼���
		//�Զ�����ק����
		//var flag = false;
		//for(var i = 0 ; i < tags.length; i++){
		//	if(e.target == tags[i]){							//ֻ����һ����true�������̷���
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
				left = 0;																					//������ק���ܳ����ҳ��
			}else if (left <= getScroll().left){
				left = getScroll().left;
			}else if(left > getinner().width + getScroll().left - _this.offsetWidth){
				left  = getinner().width + getScroll().left - _this.offsetWidth;							//������ק���ܳ��ұ�ҳ��		
			}
			
			if(top1 < 0){
				top1 = 0;																					//������ק���ܳ��ϱ�ҳ��						
			}else if (top1 <= getScroll().top){
				top1 = getScroll().top;
			}else if(top1 > getinner().height  + getScroll().top - _this.offsetHeight){
				top1 = getinner().height  + getScroll().top - _this.offsetHeight;						//������ק���ܳ��±�ҳ��		
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
