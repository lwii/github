
/*
window.onload = function(){
//个人中心-下拉菜单
	$().getClass('header_member').hover(function (){
		$().getClass('header_member').css('background','url(images/arrow2.png) no-repeat 60px center');
		$().getClass('header_member_ul').show();
	},function(){
		$().getClass('header_member').css('background','url(images/arrow.png) no-repeat 60px center');
		$().getClass('header_member_ul').hide();
	});
}
	
//登录框
	//var top1 = (document.documentElement.clientHeight - 250) / 2;
	//var left = (document.documentElement.clientWidth - 350) / 2;
	//$().getid('login').css('top', top1 + 'px').css('left', left + 'px');				//登录框不随浏览器的改变而改变	
	//window.onresize = function(){
	//	var top1 = (document.documentElement.clientHeight - 250) / 2;
	//	var left = (document.documentElement.clientWidth - 350) / 2;
	//	$().getid('login').css('top', top1 + 'px').css('left', left + 'px');				//加入onresize事件后登录框随浏览器的改变而改变
	//}
	var login = $().getid('login');
	var screen = $().getid('screen');
	var width = parseInt($().getid('login').css('width'));						//获取登录框的宽度
	var height = parseInt($().getid('login').css('height'));					//获取登录框的长度
	//login.center(width,height);													//登录框居中
	login.center(width,height).resize(function(){						//登录框随浏览器的改变一直居中
		//login.center(width,height);
		if(screen.css('display') == 'block'){
			screen.lock();
		}		
	});
	$().getClass('close').click(function(){
		login.css('display','none');										//点X关闭登录框
		screen.unlock();														//关闭登录框后解锁
	});
	$().getClass('header_login').click(function(){
		login.center(width,height);													//登录框居中
		login.css('display','block');										//点击登录弹出登录框
		screen.lock();															//弹出登录框后锁屏
	});
	
//拖拽
	login.drag();
	//拖拽的流程
	//1，先点下去  2.在点下的物体被选中，进行move移动 3抬起鼠标，停止移动
	//点击某个物体，用odiv即可，move和up是全局区域，也就是总个文档通用，应该用document
}

	//test动画列队
	$('#test').click(function(){	
		var _this = this;
		$(_this).animate({			
			mul : {									//同步动画
				w:101,
				h:300,			
			},		
		});
	});

*/
//第一种方法直接在Base里面的ready方法里面调用addDomLoaded；
//$().ready(function(){
//	alert(document.body);
//});
//第二种方法直接在Base里面调用addDomLoaded；

$(function(){	
//-----------------------------个人中心-下拉菜单--------------------------//	
	$('#header .header_member').hover(function (){
		$('#header .header_member').css('background','url(images/arrow2.png) no-repeat 60px center');
		$('#header .header_member_ul').show().animate({
			t:30,
			step:10,
			mul:{
				h : 120,
			}
		});
	},function(){
		$('#header .header_member').css('background','url(images/arrow.png) no-repeat 60px center');
		$('#header .header_member_ul').hide();
	});
//遮罩画布
	var screen = $('#screen');
//----------------------------------登录框--------------------------------//	
	var login = $('#login');	
	var width = parseInt($('#login').css('width'));						//获取登录框的宽度
	var height = parseInt($('#login').css('height'));					//获取登录框的长度
	login.center(width,height).resize(function(){						//登录框随浏览器的改变一直居中
		//login.center(width,height);
		if(screen.css('display') == 'block'){
			screen.lock();
		}		
	});
	$('#header .header_login').click(function(){
		login.center(width,height);													//登录框居中
		login.css('display','block');													//点击登录弹出登录框		
		screen.lock().animate({
			attr:'o',
			target:30,
			t:30,
			step:10
		});															//弹出登录框后锁屏
	});
	$('#login .close').click(function(){
		login.css('display','none');										//点X关闭登录框
	//先关闭登录框，再执行渐变动画
		/*screen.unlock().animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		});																	//关闭登录框后解锁		
		*/
	//先执行渐变动画，再关闭登录框
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn : function(){
				screen.unlock();
			}
		});
	});
	
//-----------------------------注册框--------------------------//	
	var reg = $('#register');	
	var width = parseInt($('#register').css('width'));						//获取注册框的宽度
	var height = parseInt($('#register').css('height'));					//获取注册框的长度
	reg.center(width,height).resize(function(){						//注册框随浏览器的改变一直居中
		//reg.center(width,height);
		if(screen.css('display') == 'block'){
			screen.lock();
		}		
	});
	$('#header .header_register').click(function(){
		reg.center(width,height);													//注册框居中
		reg.css('display','block');													//点击注册弹出注册框		
		screen.lock().animate({
			attr:'o',
			target:30,
			t:30,
			step:10
		});															//弹出注册框后锁屏
	});
	$('#register .close').click(function(){
		reg.css('display','none');										//点X关闭注册框
	//先关闭注册框，再执行渐变动画
		/*screen.unlock().animate({
			attr:'o',
			target:0,
			t:30,
			step:10
		});																	//关闭注册框后解锁		
		*/
	//先执行渐变动画，再关闭注册框
		screen.animate({
			attr:'o',
			target:0,
			t:30,
			step:10,
			fn : function(){
				screen.unlock();
			}
		});
	});

//拖拽
	login.drag();   // 拖拽登录框
	reg.drag();		//拖拽注册框

//百度分享初始化位子	
	//$('#share').css('top',getScroll().top + (getinner().height - parseInt(getstyle($('#share').first(),'height'))) / 2 + 'px');
	//滚动条事件	
	//addEvent(window,'scroll',function(){
		//可以定位在滚动条拖动的中间位子，但是经常抖动，不平滑。
	//	$('#share').css('top',getScroll().top + (getinner().height - parseInt(getstyle($('#share').first(),'height'))) / 2 + 'px');		
	//});
	$(window).bind('scroll',function(){
		setTimeout(function () {						//延迟100毫秒执行
			$('#share').animate({
				attr : 'y',
				target : getScroll().top + (getinner().height - parseInt(getstyle($('#share').first(),'height'))) / 2
		});
		},100);
	});
//百度分享收缩效果
	$('#share').hover(function(){
		$(this).animate({
			'attr':'x',
			'target':0
		});
	},function(){
		$(this).animate({
			'attr':'x',
			'target':-211
		});
	});
//滑动导航
		$('#nav .about li').hover(function(){
			var target = $(this).first().offsetLeft;
			$('#nav .nav_bg').animate({
				'attr' : 'x',
				'target' : target + 20,
				fn : function(){
					$('#nav .white').animate({
						'attr' : 'x',
						'target' : -target ,
						t : 10,
					});
				}
			});
		},function(){
			$('#nav .nav_bg').animate({
				'attr' : 'x',
				'target' :  20,
				fn : function(){
					$('#nav .white').animate({
						'attr' : 'x',
						'target' : 0 ,
						t:10,
					});
				}
			});
		});
//左侧菜单切换
		$('#sidebar h2').toggle(function(){
			$(this).next().animate({
				mul : {
					h:0,
					o:0,
				}				
			});
		},function(){
			$(this).next().animate({
				mul : {
					h:150,
					o:100,
				}		
			});
		});
//-------------------------注册验证-------------------//
		//（刷新）初始化表单操作
		$('form').first().reset();   //HTML DOM reset() 方法:把表单中的元素重置为它们的默认值。
//--------------------------用户名验证
		$('form').form('user').bind('focus',function(){
			$("#reg .info_user").css('display','block');
			$('#reg .succ_user').css('display','none');
			$("#reg .error_user").css('display','none');
		}).bind('blur',function(){
			if(trim($(this).value()) == ''){
				$('#reg .succ_user').css('display','none');
				$("#reg .error_user").css('display','none');
				$("#reg .info_user").css('display','none');
			}else if (!check_user()){
				$("#reg .error_user").css('display','block');
				$('#reg .succ_user').css('display','none');				
				$("#reg .info_user").css('display','none');
			}else {				
				$('#reg .succ_user').css('display','block');
				$("#reg .info_user").css('display','none');
				$("#reg .error_user").css('display','none');				
			}
		});
		
		function check_user(){
			if(/[a-zA-Z0-9_]{2,20}/.test(trim($('form').form('user').value())))  return true;
		}
 //--------------------------------密码验证
		$("form").form('pass').bind('focus',function(){
			$('#reg .info_pass').css('display','block');
			$('#reg .error_pass').css('display','none');
			$('#reg .succ_pass').css('display','none');
		}).bind('blur',function(){
			if(trim($(this).value()) == ''){
				$('#reg .info_pass').css('display','none');
			}else{
				 if(check_pass(this)){
						$('#reg .info_pass').css('display','none');
						$('#reg .error_pass').css('display','none');
						$('#reg .succ_pass').css('display','block');
					}else{
						$('#reg .info_pass').css('display','none');
						$('#reg .error_pass').css('display','block');
						$('#reg .succ_pass').css('display','none');
					}
			}
		});		 
				//-----密码强度验证
		$('form').form('pass').bind('keyup',function(){
				check_pass();
		});
				//密码验证函数
		function check_pass(){
			var value = trim($('form').form('pass').value());									//获取密码框中输入的值
			var value_length = value.length;										 //获取密码框中值的长度
			var code_length = 0;
		
			
					//验证第一个条件（验证6-20位之间）
			if(value_length >= 6 && value_length <= 20) {
				$("#reg .info_pass .q1").html('● ').css('color','green');
			}else {
				$("#reg .info_pass .q1").html('○ ').css('color','#666');
			}
					//验证第二个条件（验证字母或数字或非空字符，任意一个即可）
			if(value_length > 0 && !/\s/.test(value)){
				$("#reg .info_pass .q2").html('● ').css('color','green');
			}else{
				$("#reg .info_pass .q2").html('○ ').css('color','#666');
			}
					//验证第三个条件（验证大、小字母，数字，非空字符，任意两种混拼即可）
			if(/[0-9]/.test(value)){
				code_length++;
			}
			if(/[a-z]/.test(value)){
				code_length++;
			}
			if(/[A-Z]/.test(value)){
				code_length++;
			}
			if(/[^0-9a-zA-Z]/.test(value)){
				code_length++;
			}
			if(code_length >= 2){
				$("#reg .info_pass .q3").html('● ').css('color','green');
			}else {
				$("#reg .info_pass .q3").html('○ ').css('color','#666');
			}
					//验证安全级别
			if(value_length >=10 && code_length >= 3){
				$('#reg .info_pass .s1').css('color','green');
				$('#reg .info_pass .s2').css('color','green');
				$('#reg .info_pass .s3').css('color','green');			
				$('#reg .info_pass .s4').html(' 高').css('color','green');
			}else if(value_length >= 7 && code_length >= 2){
				$('#reg .info_pass .s1').css('color','#f60');
				$('#reg .info_pass .s2').css('color','#f60');
				$('#reg .info_pass .s3').css('color','#ccc');	
				$('#reg .info_pass .s4').html(' 中').css('color','#f60');
			}else if(value_length >= 6 || code_length >= 1){
				$('#reg .info_pass .s1').css('color','maroon');
				$('#reg .info_pass .s2').css('color','#ccc');
				$('#reg .info_pass .s3').css('color','#ccc');	
				$('#reg .info_pass .s4').html(' 低').css('color','maroon');
			}else{
				$('#reg .info_pass .s1').css('color','#ccc');
				$('#reg .info_pass .s2').css('color','#ccc');
				$('#reg .info_pass .s3').css('color','#ccc');	
				$('#reg .info_pass .s4').html(' ');
			}	
			if(value_length >= 6 && value_length <= 20 && !/\s/.test(value) && code_length >= 2){
				return true;
			}else{
				return false;
			}		
		}	
//----------------------------------密码确认验证
			$('form').form('notpass').bind('focus',function(){
				$('#reg .info_notpass').css('display','block');
				$('#reg .error_notpass').css('display','none');
				$('#reg .succ_notpass').css('display','none');
			}).bind('blur',function(){
				var value2 = trim($('form').form('notpass').value());
				if(value2 == ''){
					$('#reg .info_notpass').css('display','none');
				}else if(check_notpass()){
					$('#reg .info_notpass').css('display','none');
					$('#reg .error_notpass').css('display','none');
					$('#reg .succ_notpass').css('display','block');
				}else {
					$('#reg .info_notpass').css('display','none');
					$('#reg .error_notpass').css('display','block');
					$('#reg .succ_notpass').css('display','none');
				}
			});
			function check_notpass(){
				if(trim($('form').form('pass').value()) == trim($('form').form('notpass').value())) return true;
			}
/*--------------提问---------------*/
			$('form').form('ques').bind('change',function(){
				if(check_ques()) $('#reg .error_ques').css('display','none');
			});
			function check_ques(){
				if($('form').form('ques').value() != 0) return true;
			}
/*--------------回答---------------*/		
			$('form').form('ans').bind('focus',function(){
				$('#reg .info_ans').css('display','block');
				$('#reg .error_ans').css('display','none');
				$('#reg .succ_ans').css('display','none');
			}).bind('blur',function(){
				if(trim($('form').form('ans').value()) == ''){
					$('#reg .info_ans').css('display','none');
				}else if(check_user()){
					$('#reg .info_ans').css('display','none');
					$('#reg .error_ans').css('display','none');
					$('#reg .succ_ans').css('display','block');
				}else {
					$('#reg .info_ans').css('display','none');
					$('#reg .error_ans').css('display','block');
					$('#reg .succ_ans').css('display','none');
				}
			});
			function check_ans(){
				if(trim($('form').form('ans').value()).length >= 2 && trim($('form').form('ans').value()).length <= 32) return true;
			}
//----------------------------------电子邮件验证			
			$('form').form('email').bind('focus',function(){
				//补全界面
				if($(this).value().indexOf('@') == -1)$('#reg .all_email').css('display','block');
				$('#reg .info_email').css('display','block');
				$('#reg .error_email').css('display','none');
				$('#reg .succ_email').css('display','none');
			}).bind('blur',function(){
				//补全界面
				$('#reg .all_email').css('display','none');
				var value2 = trim($('form').form('email').value());
				
				if(value2 == ''){
					$('#reg .info_email').css('display','none');
				}else if(check_email()){
					$('#reg .info_email').css('display','none');
					$('#reg .error_email').css('display','none');
					$('#reg .succ_email').css('display','block');
				}else {
					$('#reg .info_email').css('display','none');
					$('#reg .error_email').css('display','block');
					$('#reg .succ_email').css('display','none');
				}
			});
			function check_email(){
				if(/^[a-zA-Z0-9_\-\.]+@[a-zA-Z0-9_\-]+(\.[a-zA-Z]{2,4}){1,2}$/.test(trim($('form').form('email').value()))) return true;
			}
//----------------------------------电子邮件验证补全界面之下拉菜单
			//电子邮件补全系统键入效果
			$('form').form('email').bind('keyup',function(event){
				//alert($(this).value());
				if($(this).value().indexOf('@') == -1) {
					$('#reg .all_email').css('display','block');
					$('#reg all_email li span').html($(this).value());
				}else {
					$('#reg .all_email').css('display','none');
				}
				//键盘上的向下键
				if(event.keyCode == 40){
					if(this.index == undefined || this.index >= $('#reg .all_email li').length() - 1){
						this.index = 0;
					}else{
						this.index++;
					}
					$('#reg .all_email li').css('background','none');
					$('#reg .all_email li').css('color','#666');
					$('#reg .all_email li').getElement(this.index).css('background','#e5edf2');
					$('#reg .all_email li').getElement(this.index).css('color','#369');
				}
				//键盘上的向上健
				if (event.keyCode == 38){
					if(this.index == undefined || this.index <= 0){
						this.index = $('#reg .all_email li').length() - 1;
					}else{
						this.index--;
					}
					$('#reg .all_email li').css('background','none');
					$('#reg .all_email li').css('color','#666');
					$('#reg .all_email li').getElement(this.index).css('background','#e5edf2');
					$('#reg .all_email li').getElement(this.index).css('color','#369');
				}
				//键盘上的回车键
				if(event.keyCode == 13){
					$(this).value($('#reg .all_email li').getElement(this.index).Text());
					$('#reg .all_email').css('display','none');
					this.index = undefined;
				}
			});
			//电子邮件补全系统点击获取							
			//$('#reg .all_email li').click(function(){
			//	alert('');
			//});
			//ps:  click事件是点击弹起后触发的，而blur失去了焦点后，没有点击弹起的元素，导致无法触发。
			$('#reg .all_email li').bind('mousedown',function(){
				$('form').form('email').value($(this).Text());
			});
			
			//电子邮件补全系统鼠标移入移出效果
			$('#reg .all_email li').hover(function(){
				$(this).css('background','#e5edf2');
				$(this).css('color','#369');
			},function(){
				$(this).css('background','none');
				$(this).css('color','#666');
			});
//----------------------------------年，月，日
			var year = $('form').form('year');
			var month = $('form').form('month');
			var day = $('form').form('day');
			var day30 = [4,6,9,11];
			var day31 = [1,3,5,7,8,10,12];
			//注入年
			for(var i = 1950; i <= 2018; i++){
				year.first().add(new Option(i,i), undefined);
			}
			//注入月
			for(var i = 1; i <= 12; i++){
				month.first().add(new Option(i,i), undefined);
			}
			//注入日
			year.bind('change', select_day);
			month.bind('change', select_day);	
			day.bind('change', function(){
				if(check_birthday())
				$('#reg .error_birthday').css('display','none');
			});
			
			function check_birthday(){
				if(year.value() != 0 && month.value() != 0 && day.value() != 0 ) return true;
			}
			function select_day(){
				if(year.value() != 0 && month.value() != 0) {
					//清理之前的注入
					day.first().options.length = 1;
					//不确定的日
					var cur_day = 0;
					if (inArray(day31,parseInt(month.value()))){
						cur_day = 31;
						//for(var i = 0; i <= 31 ; i++){
						//	day.first().add(new Option(i,i), undefined);
						//}
					}else if (inArray(day30,parseInt(month.value()))){
						cur_day = 30;
						//for(var i = 0; i <= 30; i++){
						//	day.first().add(new Option(i,i), undefined);
						//}
					}else {
						if((parseInt(year.value()) % 4 == 0 && parseInt(year.value()) % 100 != 0) || parseInt(year.value()) % 400 == 0){
							cur_day = 29;
							//for(var i = 0; i <= 29; i++){
							//	day.first().add(new Option(i,i), undefined);
							//}
						}else {
							cur_day = 28;
							//for(var i = 0; i <= 28; i++){
							//	day.first().add(new Option(i,i), undefined);
							//}
						}
					}
					for(var i = 0; i <= cur_day ; i++){
						day.first().add(new Option(i,i), undefined);
					}
				}else {
					//清理之前的注入
					day.first().options.length = 1;
				}
			}
//----------------------------------备注验证
			$('form').form('ps').bind('keyup',check_ps).bind('paste',function(){
				//paste粘贴事件会在内容粘贴到文本框之前出发，这就会得不到数据
				setTimeout(check_ps,50);  	//延迟粘贴事件出发事件
			});
				//备注清尾
				$('#reg .psss .clear').click(function(){
					$('form').form('ps').value($('form').form('ps').value().substring(0,200));
					check_ps();
				});
				//封装
				function check_ps(){
					var num = 200 - $('form').form('ps').value().length;
					if(num >= 0){
						$('#reg .pss').css('display','block');
						$('#reg .ps .num').html(num);
						$('#reg .psss').css('display','none');
						return true;
					}else{
						$('#reg .pss').css('display','none');
						$('#reg .psss').css('display','block');
						$('#reg .ps .num').html(Math.abs(num)).css('color','red');	
						return false;					
					}
				}
//----------------------------------提交验证			
			$('form').form('sub').click(function(){
				var flag = true;
				if(!check_user()){												//用户名验证
					$("#reg .error_user").css('display','block');
					flag = false;
				}
				if(!check_pass()){												//密码验证
					$('#reg .error_pass').css('display','block');
					flag = false;
				}
				if(!check_notpass()){												//密码确认验证
					$('#reg .error_notpass').css('display','block');
					flag = false;
				}
				if(!check_ques()){												//提问验证
					$('#reg .error_ques').css('display','block');
					flag = false;
				}
				if(!check_ans()){												//回答验证
					$('#reg .error_ans').css('display','block');
					flag = false;
				}	
				if(!check_email()){												//电子邮件验证
					$('#reg .error_email').css('display','block');
					flag = false;
				}
				if(!check_birthday()){												//生日验证
					$('#reg .error_birthday').css('display','block');
					flag = false;
				}
				if(!check_ps()){													//备注验证				
					flag = false;
				}				
				if(flag){
					$('form').first().submit();				//submit ：提交表单
				}
			});
//----------------------------------轮播器--------------------------------//				
			//轮播器初始化
						//图片轮播显示
			//$('#banner img').css('display','none');		
			//$('#banner img').getElement(0).css('display','block');
						//图片透明度轮播显示
			$('#banner img').opacity(0);	
			$('#banner img').getElement(0).opacity(100);
			
			$('#banner ul li').getElement(0).css('color','#333');
			$('#banner strong').html($('#banner img').getElement(0).attr('alt'));
			
			//轮播器计数器
			var banner_index = 1;
			//轮播器的种类
			var banner_type = 3;				//1表示透明度，2表示上下滚动, 3表示左右滚动
			//自动轮播器
			var banner_timer = setInterval(banner_fn,4000);
			//手动轮播器
			$('#banner ul li').hover(function(){
				clearInterval(banner_timer);					//清除自动定时器。
				if($(this).css('color') != 'rgb(51,51,51)' && $(this).css('color') != '#333'){
					banner(this,banner_index == 0 ? $('#banner ul li').length() -1 : banner_index - 1);
				}				
			},function(){
				banner_index = $(this).index() + 1;
				banner_timer = setInterval(banner_fn,4000);
			});
			function banner(obj,prev){
				//$('#banner img').css('display','none');	
				//$('#banner img').getElement($(obj).index()).css('display','block');
				$('#banner ul li').css('color','#999');
				$(obj).css('color','#333');				
				$('#banner strong').html($('#banner img').getElement($(obj).index()).attr('alt'));
		
				if (banner_type == 1) {
					$('#banner img').getElement(prev).animate({
						attr : 'o',
						target : 0,
						t : 30,
						step : 10
					}).css('zIndex', 1);
					$('#banner img').getElement($(obj).index()).animate({
						attr : 'o',
						target : 100,
						t : 30,
						step : 10
					}).css('zIndex', 2);
				} else if (banner_type == 2) {
					$('#banner img').getElement(prev).animate({
						attr : 'y',
						target : 150,
						t : 30,
						step : 10
					}).css('zIndex', 1).opacity(100);
					$('#banner img').getElement($(obj).index()).animate({
						attr : 'y',
						target : 0,
						t : 30,
						step : 10
					}).css('left', '-150px').css('zIndex', 2).opacity(100);
				} else if (banner_type == 3) {
					$('#banner img').getElement(prev).animate({
						attr : 'x',
						target : 900,
						t : 30,
						step : 10
					}).css('zIndex', 1).opacity(100);
					$('#banner img').getElement($(obj).index()).animate({
						attr : 'x',
						target : 0,
						t : 30,
						step : 10
					}).css('left', '-900px').css('zIndex', 2).opacity(100);
				}	
			}
			function banner_fn(){
				if(banner_index >= $('#banner ul li').length())  banner_index = 0;
				banner($('#banner ul li').getElement(banner_index).first(),banner_index == 0 ? $('#banner ul li').length() -1 : banner_index - 1);
				banner_index++;	
			}
//----------------------------------延迟加载--------------------------------//	
		//问题1：将xsrc地址替换到src中去
				//当图片进入到可见区域的时候，将图片的xsrc的地址替换到src即可
			//alert($('.wait_load').getElement(0).attr('xsrc'))
			//$('.wait_load').getElement(0).attr('src',$('.wait_load').getElement(0).attr('xsrc'));
		//问题2：获取图片元素到最外层顶点元素的距离
			//alert(offsetTop($('.wait_load').first()));
		//问题3：获取页面可视区域的最低点的位子
			//alert(getinner().height + getScroll().top);
			var wait_load = $('.wait_load');
			wait_load.opacity(0);
			$(window).bind('scroll',_wait_load);							//鼠标滚动时触发
			$(window).bind('resize',_wait_load);						//窗口变大时候触发
			function _wait_load () {
				setTimeout(function(){					
					for(var i = 0 ;i < wait_load.length(); i++){						
						var _this = wait_load.ge(i);	
						$(_this).attr('src',$(_this).attr('xsrc'));
						if(getinner().height + getScroll().top >= offsetTop(_this)){
							$('.wait_load').getElement(i).attr('src',$('.wait_load').getElement(i).attr('xsrc')).animate({
								attr:'o',
								target:100,
								t:30,
								step:10
							});
						}						
					}
				},100);
			}
//----------------------------------预加载--------------------------------//			
		//图片弹窗
		var photo_big = $('#photo_big');	
		var width = parseInt($('#photo_big').css('width'));						//获取注册框的宽度
		var height = parseInt($('#photo_big').css('height'));					//获取注册框的长度
		photo_big.center(width,height).resize(function(){						//注册框随浏览器的改变一直居中
			if(screen.css('display') == 'block'){
				screen.lock();
			}		
		});
		$('#photo dl dt img').click(function(){
			photo_big.center(width,height);													//注册框居中
			photo_big.css('display','block');													//点击注册弹出注册框		
			screen.lock().animate({
				attr:'o',
				target:30,
				t:30,
				step:10
			});																								//弹出注册框后锁屏
			//单击后弹出图片																				
			var temp_img = new Image();				//创建一个临时区域的图片对象		
			$(temp_img).bind('load',function(){
				$('#photo_big .big img').attr('src',temp_img.src).animate({
					attr:'o',
					target:100,
					t:30,
					step:10
				}).css('top','0').css('width','620px').css('height','460px').opacity(0);
			});
			temp_img.src= $(this).attr('bigsrc');				//src属性可以在后台加载这张图片到本地缓存
			
			 var children = this.parentNode.parentNode;    //第一个parentNode得到《dt》，第二个parentNode得到《dl》节点
			// alert($(children).index());									//把children包装成Base对象得到这个的索引
			prev_next_img(children);
		});
		
		$('#photo_big .close').click(function(){
			photo_big.css('display','none');										//点X关闭注册
			screen.animate({
				attr:'o',
				target:0,
				t:30,
				step:10,
				fn : function(){
					screen.unlock();
				}
			});
			$('#photo_big .big img').attr('src','images/loading.jpg').css('width','32px').css('height','32px').css('top','190px');
		});
		//拖拽
		photo_big.drag();   // 拖拽图片框
	//图片加载
	/*
		var temp_img = new Image();				//创建一个临时区域的图片对象
		
		$(temp_img).bind('load',function(){
			$('#photo_big .big img').attr('src',temp_img).animate({
				attr:'o',
				target:100,
				t:30,
				step:10
			}).css('top','0').opacity(0);
		});
		temp_img.src="";//src属性可以在后台加载这张图片到本地缓存
		*/
		//鼠标移入移出显示
		$('#photo_big .big .left').hover(function(){
			$('#photo_big .big .sl').animate({
				attr:'o',
				target:50,
				t:30,
				step:10
			});
		},function(){
			$('#photo_big .big .sl').animate({
				attr:'o',
				target:0,
				t:30,
				step:10
			});
		});
		
		$('#photo_big .big .right').hover(function(){
			$('#photo_big .big .sr').animate({
				attr:'o',
				target:50,
				t:30,
				step:10
			});
		},function(){
			$('#photo_big .big .sr').animate({
				attr:'o',
				target:0,
				t:30,
				step:10
			});
		});
		//点击显示图片上一张
			
		$('#photo_big .big .left').click(function(){
			$('#photo_big .big img').attr('src','images/loading.jpg').css('width','32px').css('height','32px').css('top','190px');
			var current_img = new Image();
			$(current_img).bind('load',function(){
				$('#photo_big .big img').attr('src',current_img.src).css('width','600px').css('height','450px').css('top',0);
			});			
			current_img.src = $(this).attr('src');
			var children = $('#photo dl dt img').ge(prevIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
			prev_next_img(children);
		});
		//点击显示图片下一张
		$('#photo_big .big .right').click(function(){
			$('#photo_big .big img').attr('src','images/loading.jpg').css('width','32px').css('height','32px').css('top','190px');
			var current_img = new Image();
			$(current_img).bind('load',function(){
				$('#photo_big .big img').attr('src',current_img.src).css('width','600px').css('height','450px').css('top',0);
			});			
			current_img.src = $(this).attr('src');
			var children = $('#photo dl dt img').ge(nextIndex($('#photo_big .big img').attr('index'),$('#photo').first())).parentNode.parentNode;
			prev_next_img(children);
		});

		function prev_next_img(children){					//预加载前后图片
			var prev = prevIndex($(children).index(),children.parentNode); //得到当前节点的上一个节点
			var next = nextIndex($(children).index(),children.parentNode);	//得到当前节点的下一个节点
			var prev_img = new Image();
			var next_img = new Image();
			prev_img.src = $('#photo_big dl dt img').getElement(prev).attr('bigsrc');	//得到当前图片的前一张图片
			next_img.src = $('#photo_big dl dt img').getElement(next).attr('bigsrc');	//得到当前图片的后一张图片
			$('#photo_big .big .left').attr('src',prev_img.src);								//将前一张图片的地址保存到<span>标签中
			$('#photo_big .big .right').attr('src',next_img.src);								//将后一张照片的地址保存到<span>标签中
			$('#photo_big .big img').attr('index',$(children).index());					//将当前节点索引保存到<img>中
			
			$('#photo_big .big .index').html(parseInt($(children).index()) +1 + '/' + $('#photo dl dt img').length());
		}
		
		//调用ajax
		$(document).click(function () {
			ajax({
				method : 'post',
				url : 'demo.php',
				data : {
					'name' : 'Lee',
					'age' : 100
				},
				success : function (text) {
					alert(text);
				},
				async : true
			});
		});

});









































