/**
 * Created by admin on 2018/5/26.
 */

$(function(){
    //0,使用滚动条插件来自定义滚动条
    $(".content_list").mCustomScrollbar();

    var $audio = $("audio");
    var player = new Player($audio);

    var progress;
    var voiceProgress;
    var lyric;
    //1,加载歌曲列表
    getPlayerList();
    function getPlayerList(){
        $.ajax({
            url : "./music/music.json",
            dataType : "json",
            success : function(data){
                player.musicList = data;
                //遍历获取得到的数据,创建每一条音乐
                var $contentListUl = $(".content_list ul");
                $.each(data,function(index,ele){
                    var $item = createMusicItem(index,ele);
                    $contentListUl.append($item);
                });
                initMusicInfo(data[0]);//初始化第一条歌曲信息
                initMusicLyric(data[0]);
            },
            error : function(e){
                console.log(e);
            }
        });
    }
    //初始化进度条
    initProgress();
    function initProgress(){
        var $progressBar = $(".footer_music_bar");
        var $progressLine = $(".footer_music_line");
        var $progressDot = $(".footer_music_dot");
        progress = new Progress($progressBar,$progressLine,$progressDot);
        progress.progressClick(function(value){
            player.musicSeekTo(value);
        });
        progress.progressMove(function(value){
            player.musicSeekTo(value);
        });

        var $voiceBar = $(".footer_voice_bar");
        var $voiceLine = $(".footer_voice_line");
        var $voiceDot = $(".footer_voice_dot");
        voiceProgress = new Progress($voiceBar,$voiceLine,$voiceDot);
        voiceProgress.progressClick(function(value){
            player.musicVoiceSeekTo(value);
        });
        voiceProgress.progressMove(function(value){
            player.musicVoiceSeekTo(value);
        });
    }
    //初始化歌曲信息
    function initMusicInfo(value){
        //获得对应的元素
        var $musicImg = $(".song_info_pic img");
        var $musicName = $(".song_info_name a");
        var $musicSinger = $(".song_info_singer a");
        var $musicAlbum = $(".song_info_album a");
        var $musicTopName = $(".footer_music_top_name");
        var $musicTopTime = $(".footer_music_top_time");
        var $musicBg = $("#mask_bg");
        //给获得的元素赋值
        $musicImg.attr("src",value.cover);
        $musicName.text(value.name);
        $musicSinger.text(value.singer);
        $musicAlbum.text(value.album);
        $musicTopName.text(value.name + "--" + value.singer );
        //$musicTopTime.text("00:00/" + value.time);
        $musicBg.css("background","url('"+ value.cover +"')");
    }
    //初始化歌词信息
    function initMusicLyric(music){
        lyric = new Lyric(music.link_lrc);
        var $lyricContainer = $(".song_lyrics ul");
        $lyricContainer.html("");           //清空上一首音乐的歌词
        lyric.loadLyric(function(){
            //创建歌词列表
            $.each(lyric.lyrics,function(index,ele){
                var $li = $("<li>" +ele+ "</li>");
                $lyricContainer.append($li);
            });
        });
    }
    //初始化事件监听
    initEvents();
    function initEvents(){
        /*
         *   动态的添加的音乐列表要用事件委托
         * */
        $(".content_list").delegate(".list_music","mouseenter",function(){
            $(this).find(".list_menu").stop().fadeIn(10);
            $(this).find(".list_time a").stop().fadeIn(10);
            $(this).find(".list_time span").stop().fadeOut(10);
        });
        $(".content_list").delegate(".list_music","mouseleave",function(){
            $(this).find(".list_menu").stop().fadeOut(10);
            $(this).find(".list_time a").stop().fadeOut(10);
            $(this).find(".list_time span").stop().fadeIn(10);
        });
        //监听复选框的点击事件
        $(".content_list").delegate(".list_music .list_check","click",function(){
            $(this).toggleClass("list_checked");
        });

        var $musicPlay = $(".footer_music_play");
        //切换播放图标
        $(".content_list").delegate(".list_menu_play","click",function(){
            var $listMusic = $(this).parents(".list_music");

            $(this).toggleClass("list_menu_play1");             //切换播放图标
            //关闭其他兄弟标签的图标
            $listMusic.siblings().find(".list_menu_play").removeClass("list_menu_play1");
            if($(this).attr("class").indexOf("list_menu_play1") != -1){
                //更改底部图标
                $musicPlay.addClass("footer_music_play1");
                $listMusic.find("div").css("color","rgba(255,255,255,1)");//让当前行文字高亮
                $listMusic.siblings().find("div").css("color","rgba(255,255,255,0.5)");//排他,除当前行外其他行变暗
            }else{
                $musicPlay.removeClass("footer_music_play1");
                $listMusic.find("div").css("color","rgba(255,255,255,0.5)");
            }
            $listMusic.find(".list_number").toggleClass("list_number1");        //切换当前行的文字状态
            $listMusic.siblings().find(".list_number").removeClass("list_number1");//排他,

            //播放音乐
            player.playMusic($listMusic.get(0).index,$listMusic.get(0).music);
            //切换歌曲信息
            initMusicInfo($listMusic.get(0).music);
            //切换歌词信息
            initMusicLyric($listMusic.get(0).music);
        });
        //监听底部控制区域播放按钮的点击
        $musicPlay.click(function(){
            //判断有没有播放过的音乐
            if(player.currentIndex == -1){
                //没有播放过音乐
                $(".list_music").eq(0).find(".list_menu_play").trigger("click");
            }else{
                //播放过音乐
                $(".list_music").eq(player.currentIndex).find(".list_menu_play").trigger("click");
            }
        });
        //监听底部控制区域上一个按钮的点击
        $(".footer_music_prev").click(function(){
            $(".list_music").eq(player.prevMusic()).find(".list_menu_play").trigger("click");
        });
        //监听底部控制区域下一个按钮的点击
        $(".footer_music_next").click(function(){
            $(".list_music").eq(player.nextMusic()).find(".list_menu_play").trigger("click");
        });
        //监听删除按钮的点击
        $(".content_list").delegate(".list_menu_del","click",function(){
            var $del = $(this).parents(".list_music");//找到被点击的音乐
            //判断被删除的音乐是不是当前在播放的音乐
            if($del.get(0).index == player.currentIndex){
                $(".footer_music_next").trigger("click");
            }
            $del.remove();                              //移除找到的音乐
            player.delMusic($del.get(0).index);
            console.log(player.musicList);
            //删除数据后序号重新排序
            $(".list_music").each(function(index,ele){
                ele.index = index;
                $(this).find(".list_number").text(ele.index + 1);
            });
        });
        //监听播放进度
        player.musicTimeUpdate(function(currentTime,duration,timeStr){
            //同步时间
            $(".footer_music_top_time").text(timeStr);
            //同步进度条
            var value = currentTime / duration * 100;
            progress.setProgress(value);
            //歌词同步
            var index = lyric.currentIndex(currentTime);
            var $item = $(".song_lyrics").find("li").eq(index);
            $item.addClass("cur");
            $item.siblings().removeClass("cur");
            if(index <= 5) return;
            $(".song_lyrics ul").css({
                marginTop : (-index + 5)* 33,

            });
        });
        //声音按钮的点击
        $(".footer_voice_icon").click(function(){
            $(this).toggleClass("footer_voice_icon1");
            if($(this).attr("class").indexOf("footer_voice_icon1") != -1){
                player.musicVoiceSeekTo(0);
            }else{
                player.musicVoiceSeekTo(1);
            }
        });
    }


    //动态的创建歌曲列表
    function createMusicItem(index,music){
        var $li = $("<li class=\"list_music\">\n" +
        "    <div class=\"list_check\"><i></i></div>\n" +
        "               <div class=\"list_number\">"+ (index+1)+"</div>\n" +
        "                    <div class=\"list_name\">"+ music.name +"\n" +
        "                        <div class=\"list_menu\">\n" +
        "                           <a href=\"javascript:;\" title=\"播放\" class=\"list_menu_play\"></a>\n" +
        "                           <a href=\"javascript:;\" title=\"添加\"></a>\n" +
        "                           <a href=\"javascript:;\" title=\"下载\"></a>\n" +
        "                           <a href=\"javascript:;\" title=\"分享\"></a>\n" +
        "                       </div>\n" +
        "                   </div>\n" +
        "                   <div class=\"list_singer\">"+ music.singer +"</div>\n" +
        "                    <div class=\"list_time\">\n" +
        "                           <span>"+ music.time+"</span>\n" +
        "                           <a href=\"javascript:;\" title=\"删除\" class=\"list_menu_del\"></a>\n" +
        "                   </div>\n" +
        "           </li>");

        $li.get(0).index = index;
        $li.get(0).music = music;
        return $li;
    }


});


























