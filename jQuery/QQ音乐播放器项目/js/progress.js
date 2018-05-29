/**
 * Created by admin on 2018/5/29.
 */
/*
*   封装进度条
* */
(function(window){
    function Progress($progressBar,$progressLine,$progressDot){
        return new Progress.prototype.init($progressBar,$progressLine,$progressDot);
    }
    Progress.prototype = {
        constructor : Progress,
        isMove : false,
        init : function($progressBar,$progressLine,$progressDot){
            this.proBar = $progressBar;
            this.proLine = $progressLine;
            this.proDot = $progressDot;
        },
        progressClick : function(callBack){
            var _this = this;
            this.proBar.click(function(event){
                //获得背景距离浏览器窗口的位置
                var normalLeft = $(this).offset().left;
                //获得点击的位置距离窗口的位置
                var eventLeft = event.pageX;
                _this.proLine.css("width",eventLeft - normalLeft);
                _this.proDot.css("left",eventLeft - normalLeft);
                //计算进度条的比例
                var value = (eventLeft - normalLeft) / $(this).width();
                callBack(value);
            });
        },
        progressMove : function(callBack){
            var _this = this;
            //获得背景距离浏览器窗口的位置
            var normalLeft = this.proBar.offset().left;
            var eventLeft;
            this.proBar.mousedown(function(){
                _this.isMove = true;
                $(document).mousemove(function(event){
                    //获得点击的位置距离窗口的位置
                    eventLeft = event.pageX;
                    var offset = eventLeft - normalLeft;
                    if( offset > 0 && offset < _this.proBar.width()){
                        _this.proLine.css("width",eventLeft - normalLeft);
                        _this.proDot.css("left",eventLeft - normalLeft);
                    }
                });
            });
            $(document).mouseup(function(){
                $(document).off("mousemove");
                _this.isMove = false;
                //计算进度条的比例
                var value = (eventLeft - normalLeft) / _this.proBar.width();
                callBack(value);
            });
        },
        setProgress : function(value){
            if(this.isMove) return;
            if(value < 0 || value > 100) return;
            this.proLine.css({
                width : value + "%"
            });
            this.proDot.css({
                left : value + "%"
            });
        },
    };
    Progress.prototype.init.prototype = Progress.prototype;
    window.Progress = Progress;
})(window);
