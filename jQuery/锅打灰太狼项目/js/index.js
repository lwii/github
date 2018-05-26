/**
 * Created by admin on 2018/5/26.
 */

$(function(){
   /*
   *    ��ʾ��Ϸ�����������Ϸ����
   */
    $(".regulation").click(function(){
        $(".rule").stop().fadeIn(100);
    });
    $(".rule>a").click(function(){
        $(".rule").stop().fadeOut(100);
    });
    /*
     *    ���¿�ʼ��Ϸ�������Ϸ
     */
    $(".mask>button").click(function(){
        $(".mask").stop().fadeOut(100);
        createProgress();
        startWolfAnimation();         //�����̫�Ƕ����ķ���
    });
    /*
     *    ������ʼ��Ϸ�������Ϸ
     */
    $(".start").click(function(){
        $(this).stop().fadeOut(100);
        createProgress();       //�������������
        startWolfAnimation();         //�����̫�Ƕ����ķ���

    });
     //����������Ϸ��ʱ��������ķ���
    function createProgress(){
        $(".progress").css("width","180px");
        //���ö�ʱ��
        var timer = setInterval(function(){
            var blood = $(".progress").width();
            blood -= 1;
            $(".progress").css("width",blood);
            //�����������Ƿ�����
            if(blood <= 0 ){
                clearInterval(timer);
                $(".mask").stop().fadeIn(100);
                stopWolfAnimation();
            }
        },100)
    }

    //�����̫�Ƕ����ķ���
    var wolfTimer;
    function startWolfAnimation(){
        //�����̫��ͼƬ������
        var wolf1 = ['./img/h0.png','./img/h1.png','./img/h2.png','./img/h3.png','./img/h4.png',
                     './img/h5.png','./img/h6.png','./img/h7.png','./img/h8.png','./img/h9.png'];
        //����С�һ�ͼƬ������
        var wolf2 = ['./img/x0.png','./img/x1.png','./img/x2.png','./img/x3.png','./img/x4.png',
            './img/x5.png','./img/x6.png','./img/x7.png','./img/x8.png','./img/x9.png'];
        //������ܳ��ֵ�λ��
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
        //����ͼƬ
        var $wolfImg = $("<img src='' class='wolfimg'/>");
        //�����ȡͼƬ���ֵ�λ��
        var posIndex = Math.round(Math.random()*8);
        //����ͼƬ��λ��
        $wolfImg.css({
            position :"absolute",
            left : arrPos[posIndex].left,
            top : arrPos[posIndex].top
        });
        //�����ȡ���������
        var posArr = Math.round(Math.random()) == 0 ? wolf1 : wolf2;
        //����ͼƬ������
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

        //���ͼƬ��������
        $("#game").append($wolfImg);

        //���ô�����Ϸ����ķ���
        gameRules($wolfImg);
    }

    //������Ϸ����ķ���
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
















































