/**
 * Created by admin on 2018/5/26.
 */

$(function(){
    //�ù�������������������
    $(".content_list").mCustomScrollbar();
    //����������������Ƴ�
    $(".list_music").hover(function(){
        $(this).find(".list_menu").stop().fadeIn(100); //��ʾmenu
        $(this).find(".list_time a").stop().fadeIn(100);//��ʾɾ��
        $(this).find(".list_time span").stop().fadeOut(100);//����ʱ��
    },function(){
        $(this).find(".list_menu").stop().fadeOut(100);//����menu
        $(this).find(".list_time a").stop().fadeOut(100);//����ɾ��
        $(this).find(".list_time span").stop().fadeIn(100);//��ʾʱ��
    });
    //������ѡ��ĵ���¼�
    $(".list_music .list_check").click(function(){
        $(this).toggleClass("list_checked");
    });
    $(".list_title .list_check").click(function(){
        $(this).toggleClass("list_checked");
        $(".list_title").siblings().toggleClass("list_checked");
    });
});


























