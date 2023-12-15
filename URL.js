
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
		
/*로그인 출력 스크립트*/
function submitLoginForm(event) {
	event.preventDefault();

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;

	console.log("사용자 이름:", username);
	console.log("비밀번호:", password);

	closePopup();
}







/* ShortenUrl을 만들기 위해 Orignal URL을 base62Chars사용하여 랜덤한 값으로 변환 후 반환 */
function generateShortUrl(originalUrl) {
	const base62Chars = "aZbYc0XdWeV1fUgTh2SiRjQ3kPlOm4NnMoL5pKqJr6IsHtG7uFvEw8DxCyB9zA";
	const base62Length = base62Chars.length;

	let randomString = "";
	for (let i = 0; i < 6; i++) {
		const randomIndex = Math.floor(Math.random() * base62Length);
		randomString += base62Chars.charAt(randomIndex);
	}

	const shortUrl = `https://SUI/${randomString}`;
	return shortUrl;
}

/* ShortenUrl -> Orginal URL로 다시 변환 */
function getOriginalUrl(shortUrl) {
	const randomString = shortUrl.split("/").pop();
	const base62Chars = "aZbYc0XdWeV1fUgTh2SiRjQ3kPlOm4NnMoL5pKqJr6IsHtG7uFvEw8DxCyB9zA";
	const base62Reverse = base62Chars.split("").reverse().join("");

	const originalUrl = randomString
		.split("")
		.map(char => base62Reverse.indexOf(char))
		.reduce((acc, val) => acc * base62Chars.length + val, 0);

	return originalUrl;
}

function shortenUrl() {
	/*코드 변경에 따른 비활성화
	var div = document.getElementById("URL_div");
		
	if (div.style.display === "none") {
		div.style.display = "block";
	}else{
		div.style.display = "none";
	}
	*/
		const originalUrlInput = document.getElementById('originalUrl');
		const shortUrlDisplay = document.getElementById('shortUrl');
		const originalResultDisplay = document.getElementById('originalResult');

		const originalUrl = originalUrlInput.value;

		if (originalUrl.trim() === "") {
			alert("Please enter a valid URL.");
			return;
		}

		const shortUrl = generateShortUrl(originalUrl);

		shortUrlDisplay.textContent = shortUrl;
		originalResultDisplay.textContent = "";

		const retrievedUrl = getOriginalUrl(shortUrl);
		originalResultDisplay.textContent = retrievedUrl;
}


/*줄여진 URL을 클립보드에 복사를 위해 */
function copy_Clipboard() {


	const div_text= document.getElementById('shortUrl');
	textToCopy = div_text.textContent;
	navigator.clipboard.writeText(textToCopy)
		.then(() => {
			console.log('텍스트가 성공적으로 클립보드에 복사되었습니다.');
			alert('텍스트가 클립보드에 복사되었습니다.');
		})
		.catch(err => {
			console.error('클립보드 복사 실패:', err);
			alert('텍스트를 클립보드에 복사하는 데 실패했습니다.');
		});
	}
	

/*변환 버튼을 누르면 리스트가 추가되는 형식을 만들기 위해 addEventListener 사용 */
document.addEventListener('DOMContentLoaded', function () {
	const changeURLButtons = document.querySelectorAll('.change_button');
	changeURLButtons.forEach(function (button) {
			button.addEventListener('click', function () {
					addItem();
			});
	});
});

/*table의 tr, th 추가 */
function addItem() {
	const historyTableBody = document.querySelector('.history_table tbody');
	
	const newRow = document.createElement('tr');
	newRow.classList.add('list-item');

	const itemDateCell = document.createElement('td');
	itemDateCell.classList.add('item-date');
	const currentDate = new Date().toISOString().slice(0, 10);
	itemDateCell.textContent = currentDate;

	const itemNumberCell = document.createElement('td');
	itemNumberCell.classList.add('item-number');
	itemNumberCell.textContent = (historyTableBody.children.length + 1 - 1);

	const itemOrignalCell = document.createElement('td');
	itemOrignalCell.classList.add('item-orignal');
	const orignal_Url = document.getElementById('originalUrl');
	itemOrignalCell.textContent = orignal_Url.value;

	const itemTextCell = document.createElement('td');
	itemTextCell.classList.add('item-text');
	const shorten_URL = document.getElementById('shortUrl');
	itemTextCell.textContent = shorten_URL.textContent;

	const itemButtonsCell = document.createElement('td');
	itemButtonsCell.classList.add('item-buttons');
	const deleteButtonsCell = document.createElement('td');
	deleteButtonsCell.classList.add('delete-buttons');
	const QRButtonsCell = document.createElement('td');
	QRButtonsCell.classList.add('qr-buttons');
	
	/*동적할당 및 '복사' 버튼 제작 */
	const button1 = document.createElement('button');
	button1.classList.add('item-button');
	button1.textContent = '복사';  
	button1.addEventListener('click', function () {
    copyTextToClipboard(itemTextCell.textContent);
  });
	itemButtonsCell.appendChild(button1);
	
	/*동적할당-> 행이 추가되어도 코드가 작동할 수 있도록 하는 코드*/
	const button2 = document.createElement('button');
	button2.classList.add('delete-button');
	button2.textContent = '삭제';
	button2.addEventListener('click', function () {
    deleteRow(this);
  });
	deleteButtonsCell.appendChild(button2);

	/*동적할당 및 'QR코드 변환' 버튼 제작 */
	const button3 = document.createElement('button');
	button3.classList.add('qr-button');
	button3.textContent = 'QR변환';
	button3.addEventListener('click', function () {
		// QR 코드 생성 팝업 창 열기
		openQRWindow(itemTextCell.textContent);
	});
	QRButtonsCell.appendChild(button3);
		
	newRow.appendChild(itemDateCell);
	newRow.appendChild(itemNumberCell);
	newRow.appendChild(itemOrignalCell);
	newRow.appendChild(itemTextCell);
	newRow.appendChild(itemButtonsCell);
	newRow.appendChild(deleteButtonsCell);
	newRow.appendChild(QRButtonsCell);

	historyTableBody.appendChild(newRow);
}


function deleteRow(button) {
	// 버튼이 속한 행을 찾아 삭제
	var row = button.parentNode.parentNode;
	row.parentNode.removeChild(row);
};


// '복사' 버튼 클릭 시 텍스트를 클립보드에 복사하는 함수
function copyTextToClipboard(text) {
navigator.clipboard.writeText(text)
	.then(() => {
		console.log('텍스트가 성공적으로 클립보드에 복사되었습니다.');
		alert('텍스트가 클립보드에 복사되었습니다.');
	})
	.catch(err => {
		console.error('클립보드 복사 실패:', err);
		alert('텍스트를 클립보드에 복사하는 데 실패했습니다.');
	});
}



function openQRWindow(text) {
  const qrWindow = window.open('', '_blank', 'width=300,height=300');
  
  // QR 코드 생성 및 표시 로직 추가
  const qrCodeContainer = document.createElement('div');
  qrWindow.document.body.appendChild(qrCodeContainer);

  generateQRCode(text, qrCodeContainer);

}


function generateQRCode(text, container) {
  // QR 코드 생성 로직을 추가
	
  const qrcode = new QRCode(container, {
    text: text,
    width: 200,
    height: 200
  });
}
