// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//세준
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
  <section id="startPage">
    <div id="logo">
      <img src="./startPage/ralphLogo.png" width="300" height="250"></img>
    </div>
    <div id="spacebar">PRESS SPACEBAR</div>
		<div class="text">WEB PROGRAMMING TEAM 8<br>MINSEOK SEJUN GONYOUNG EUNSEO</div>
  </section>
`
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

//세준
document.addEventListener(
  "keydown",
  (event) => {
    if (event.code === "Space") {
      moveToStagePage();
      event.preventDefault(); // 스페이스바의 기본 동작을 방지합니다.
      startPageAudio.pause(); // 노래 중단
    }
  },
  { once: true }
);

//은서
let changecolor;
changeColor();
let startPageAudio = new Audio("./source/WreckItRalph_StartPage.mp3");
startPageAudio.loop = true;
startPageAudio.play();

//
// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//세준
function moveToStagePage() {
  document.querySelector("#startPage").style.display = "none";
  gameState = "stagePage";
  document.querySelector("#selectGame").style.display = "block";
  clearInterval(changecolor);
}

//은서
function changeColor() {
  changecolor = setInterval(flashText, 1000);
}
function flashText() {
  let elem = document.querySelector("#spacebar");
  let currentColor = elem.style.color;
  elem.style.color = currentColor === "rgb(217, 207, 74)" ? "white" : "#d9cf4a";
}
