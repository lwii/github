
/*
//ֱ�ӻ�ȡ��ҳ�е�ֵ
window.onload = function(){
	alert(document.getElementById('box').innerHTML);
	alert(document.getElementsByName('sex')[0].value);
	alert(document.getElementsByTagName('p')[0].innerHTML);		
}

//ͨ������ʽ��ȡ��ҳ�е�ֵ
window.onload = function(){
	alert(getid('box').innerHTML);       //   alert($('box').innerHTML);	
	alert(getName('sex')[0].value);
}

//ͨ������ʽ��ȡ��ҳ�е�ֵ
window.onload = function(){
	alert(Base.getid('box').innerHTML);
	alert(Base.getname('sex')[0].value);
	alert(Base.gettag('p')[0].innerHTML);
}

window.onload = function(){
	Base.getid('box').css('color','red').css('background','black').html('pox').click(function(){
		alert('a');
	});
	//Base��һ��������ĺ��Ķ���
	//Base.getid('box')���ص���һ��divElement���������û��CSS������
	//��Base��getid('box')���ظĳ�Base����
	//��Base���������css������html������click����
}

window.onload = function(){
//��װ��-��׺	
	//alert(base.getid('box').elements.length);
	//$().getid('box').css('color','blue').css('background','black');
	//alert(base.gettag('p').elements.length);
	//$().gettag('p').css('color','red').html('poxxx').click(function(){
	//	alert('hello!');
	//});
	
//��װ��-CSS
	//alert($().getid('box').html());   					//��ȡdiv�е�����
	//alert($().getid('box').css('color'));			//��ȡdiv��CSS��ʽ�����Ե�ֵ
	//alert($().getClass('class_name').elements.length);//��ȡclass����������class_name�����鳤��
	//$().getClass('class_name').css('color','blue');		//�޸�����class��css��ʽ
	//alert($().getClass('class_name').getElement(2).elements.length);//��ȡclass�����е���class_name�����鳤��
	//$().getClass('class_name').getElement(2).css('color','pink');			//�޸ĵ���class��css��ʽ
	//$().getClass('class_name','bbb').css('color','blue');		
	//$().getid('aaa').css('color','red');				//IDΪaaa��DIV��ɫ���red
	//$().getid('bbb').css('color','blue');				//IDΪaaa��IDΪbbb������DIV��ɫ���blue�����������⣬��ΪBase.prototype.elements = [];	�ǹ��еġ�

	//$().getid('aaa').add_class('a').add_class('b').remove_class('a').remove_class('b');//��Ӻ��Ƴ�class���Ե�ֵ
	
	//$().remove_rule(0);
}

//��ͳ�¼��󶨵ı׶ˣ�ֵ��ӡ��3, ���һ��������ǰ��������
window.onload = function(){
	alert('1');
}
window.onload = function(){
	alert('2');
}
window.onload = function(){
	alert('3');
}
//�����¼���
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
	//CSSѡ����
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

//��������
function getState(){
	alert('');
}
getState();							//��Ҫ����һ�£��Ƚ϶���

alert('');								//ֱ��д��ȫ����Ƚϻ���
(function (){						//�հ�
	window.sys = {};														//���ⲿ���Է��ʣ������������Ϣ����
	var ua = navigator.userAgent.toLowerCase(); 	//navigator.userAgent��ȡ�������Ϣ�ַ�����toLowerCase() �������ڰ��ַ���ת��ΪСд��
	var s ;																			//�������Ϣ���飬���������+�汾
	
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




//��ͳDOM����
window.onload = function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
}
//PS:�����ͼƬ����ôҪ��ͼƬ�������֮����ִ��onload�¼���
//����DOM����
addEvent(document,'DOMContentLoaded',function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
});
//PS:�����ͼƬ����ִ�нڵ���������ݣ�Ȼ���ڻ�������ͼƬ��Ҳ����˵����DOM���ṹ������ɺ󼴿�ִ����
//PS��IEʹ�ô�ͳҲ����ͼƬ������Ϻ���ִ��DOM�ڵ������IE6��7��8��֧��DOMContentLoaded


//IE6��7��8ģ��DOMContentLoaded
document.write('<script id = 'ie_loaded' defer='defer' src='javascript:void(0)'></script>');
var ie_loaded = document.getElementById('ie_loaded');
ie_loaded.onreadystatechange = function(){
	var box = document.getElementById('box');
	alert(box.innerHTML);
}
//ps:��Ч��DOM������Ϻ�ִ���˽ڵ���������Һ���ż������ͼƬ
//PS��ȱ�ݣ������iframe��ǩ����ô���ַ����ͻ�ȴ�iframe��������ݼ�����ϲ���ִ�нڵ�

//ʹ�ã��ӣ�����
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
	//���ַ�����Ŀǰ�������������ζ���complete������onload��jiͼƬ���غ����
	//���ڷ���������������¼��ݼ���
	timer = setInterval(function(fn){
		if(/loaded|complete/.test(document.readyState)){   //loaded�ǲ��ּ��أ��п���ֻ��DOM������ϣ�complete��ȫ��������ϣ��൱��onload
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

//������̽
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














