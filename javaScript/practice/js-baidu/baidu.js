// JavaScript Document


window.onload = function(){
	var getid1 = document.getElementById("set");
	var getid2 = document.getElementById("seting");
	
	getid1.onmouseover = function(){
		getid2.style.display = "block";
	};
	getid1.onmouseout = function (){
		getid2.style.display = "none";
	}
	
	var login = document.getElementById("l_ogin");
	var login1 = document.getElementById("login");

	login.onclick = function(){
		login1.style.display = "block";
	}
	var close1 = document.getElementById("login_close");
	close1.onclick = function(){
		login1.style.display = "none";	
	}

}