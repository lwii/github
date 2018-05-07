// JavaScript Document

window.onload = function(){
	
	var start = document.querySelector(".start");
	var inte = document.querySelector(".inte");
	
	start.onclick = function(){
		start.createStart();
		inte.style.display = "block";
		this.style.display = "none";
	}
	var start = {
		createStart:function(){
			this.myPlane = this.addImg("img/self.jpg");
			this.enemyPlane = this.addImg("img/boss.jpg");
			this.bullet = this.addImg("img/bullet.jpg");
		},
		addImg:function(src){
			var img = document.createElement("img");
			img.style.position = "absolute";
			img.src = src;
			return img;
		}
	};

}