/**
 * Created by admin on 2018/5/29.
 */
/*
*   歌词
* */
(function(window){
    function Lyric(path){
        return new Lyric.prototype.init(path);
    }
    Lyric.prototype = {
        constructor : Lyric,
        times : [],
        lyrics : [],
        index : -1,
        init : function(path){
            this.path = path;
        },
        loadLyric : function(callBack){
            var _this = this;
            $.ajax({
                url : _this.path,
                dataType : "text",
                success : function(data){
                    _this.parseLyric(data);
                    callBack()
                },
                error : function(e){
                    console.log(e);
                }
            });
        },
        parseLyric : function(data){
            var _this = this;
            _this.times = [];       //清空上一首歌的歌词时间
            _this.lyrics = [];      //清空上一首歌的歌词
            var array = data.split("\n");
            //遍历取出每一行歌词
            var timeReg = /\[(\d*:\d*\.\d*)\]/;
            $.each(array,function(index,ele){
                //处理时间
                var res = timeReg.exec(ele);
                if(res == null) return true;
                var timeStr = res[1];
                var res2 = timeStr.split(":");
                var min = parseInt(res2[0]) * 60;
                var sec = parseFloat(res2[1]);
                var time = parseFloat(Number(min + sec).toFixed(2));
                _this.times.push(time);

                //处理歌词
                var lrc = ele.split("]")[1];
                //if(lrc.length == 1) return true; //排除空字符串
                _this.lyrics.push(lrc);
            });

        },
        currentIndex : function(currentTime){
            if(currentTime >= this.times[0]){
                this.index++;
                this.times.shift();     //删除数组最前面一个元素
            }
            return this.index;
        }

    };
    Lyric.prototype.init.prototype = Lyric.prototype;
    window.Lyric = Lyric;
})(window);