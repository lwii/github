/**
 * Created by admin on 2018/5/26.
 */

$(function(){
    //用滚动条插件来定义滚动条
    $(".content_list").mCustomScrollbar();
    //监听歌曲鼠标移入移出
    $(".list_music").hover(function(){
        $(this).find(".list_menu").stop().fadeIn(100); //显示menu
        $(this).find(".list_time a").stop().fadeIn(100);//显示删除
        $(this).find(".list_time span").stop().fadeOut(100);//隐藏时长
    },function(){
        $(this).find(".list_menu").stop().fadeOut(100);//隐藏menu
        $(this).find(".list_time a").stop().fadeOut(100);//隐藏删除
        $(this).find(".list_time span").stop().fadeIn(100);//显示时长
    });
    //监听复选框的点击事件
    $(".list_music .list_check").click(function(){
        $(this).toggleClass("list_checked");
    });
    $(".list_title .list_check").click(function(){
        $(this).toggleClass("list_checked");
        $(".list_title").siblings().toggleClass("list_checked");
    });
});


























