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

	// 여기에 로그인 처리 로직을 추가하세요.
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	// 간단한 예제: 입력 받은 정보를 콘솔에 출력
	console.log("사용자 이름:", username);
	console.log("비밀번호:", password);

	// 로그인 처리 로직을 여기에 추가하세요.

	// 로그인 성공 시 팝업을 닫을 수 있습니다.
	closePopup();
}