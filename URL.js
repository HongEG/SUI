function toggleVisibility() {
	var div = document.getElementById("URL_div");
  if (div.style.display === "none") {
    div.style.display = "block";
  }else{
		div.style.display = "none";
  }
}

function login_button_click(){
	alert("버튼");
}

document.addEventListener("DOMContentLoaded", function() {
	closePopup();
});

function openPopup() {
	document.getElementById("overlay").style.display = "flex";
	document.getElementById("popup").style.display = "block";
}

function closePopup() {
	document.getElementById("overlay").style.display = "none";
	document.getElementById("popup").style.display = "none";
}
		
		
function submitLoginForm(event) {
	event.preventDefault();

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	console.log("사용자 이름:", username);
	console.log("비밀번호:", password);

	closePopup();
}
