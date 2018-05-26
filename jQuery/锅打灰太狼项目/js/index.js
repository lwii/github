/**
 * Created by admin on 2018/5/26.
 */

$(function(){
   /*
   *    显示游戏规则和隐藏游戏规则
   */
    $(".regulation").click(function(){
        $(".rule").stop().fadeIn(100);
    });
    $(".rule>a").click(function(){
        $(".rule").stop().fadeOut(100);
    });
    /*
     *    重新开始游戏后进入游戏
     */
    $(".mask>button").click(function(){
        $(".mask").stop().fadeOut(100);
        createProgress();
        startWolfAnimation();         //处理灰太狼动画的方法
    });
    /*
     *    单机开始游戏后进入游戏
     */
    $(".start").click(function(){
        $(this).stop().fadeOut(100);
        createProgress();       //处理进度条方法
        startWolfAnimation();         //处理灰太狼动画的方法

    });
     //创建处理游戏中时间进度条的方法
    function createProgress(){
        $(".progress").css("width","180px");
        //设置定时器
        var timer = setInterval(function(){
            var blood = $(".progress").width();
            blood -= 1;
            $(".progress").css("width",blood);
            //监听进度条是否走完
            if(blood <= 0 ){
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
            }
        },100)
    }

    //处理灰太狼动画的方法
    var wolfTimer;
    function startWolfAnimation(){
        //定义灰太狼图片的数组
        var wolf1 = ['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png',
                     './img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
        //定义小灰灰图片的数组
        var wolf2 = ['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png',
            './img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
        //定义可能出现的位子
        var arrPos = [
            {left:"100px",top:"115px"},
            {left:"20px",top:"160px"},
            {left:"190px",top:"142px"},
            {left:"105px",top:"193px"},
            {left:"19px",top:"221px"},
            {left:"202px",top:"212px"},
            {left:"120px",top:"275px"},
            {left:"30px",top:"295px"},
            {left:"209px",top:"297px"}
        ];
        //创建图片
        var $wolfImg = $("<img src='' class='wolfimg'/>");
        //随机获取图片出现的位置
        var posIndex = Math.round(Math.random()*8);
        //设置图片的位置
        $wolfImg.css({
            position :"absolute",
            left : arrPos[posIndex].left,
            top : arrPos[posIndex].top
        });
        //随机获取数组的类型
        var posArr = Math.round(Math.random()) == 0 ? wolf1 : wolf2;
        //设置图片的内容
        window.wolfIndex = 0;
        window.wolfIndexEnd = 5;
        wolfTimer = setInterval(function(){
            if(wolfIndex > wolfIndexEnd){
                $wolfImg.remove();
                clearInterval(wolfTimer);
                startWolfAnimation();
            }
            $wolfImg.attr("src",posArr[wolfIndex]);
            wolfIndex++;
        },130);

        //添加图片到主界面
        $("#game").append($wolfImg);

        //调用处理游戏规则的方法
        gameRules($wolfImg);
    }

    //处理游戏规则的方法
    function gameRules($wolfImg){
        $wolfImg.one("click",function(){
            window.wolfIndex = 5;
            window.wolfIndexEnd = 9;
            var $src = $(this).attr("src");
            var flag = $src.indexOf("h") >= 0;
            if(flag){
                $(".score").text(parseInt($(".score").text()) + 10);
            }else{
                $(".score").text(parseInt($(".score").text()) - 10);
            }
        });
    }

    function stopWolfAnimation(){
        $(".wolfimg").remove();
        clearInterval(wolfTimer);
    }
});
















































