// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//민석
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <div id="selectGame">
      <div id="text2">
        Select Stage!
      </div>
      <div id="selectgame_image">
        <img src="./stagePage/WreckItRalph.png" width="700" id="game1Img" onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
        <img src="./stagePage/SugarRush.png" width="700" id="game2Img" onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
        <img src="./stagePage/Hero'sDuty.png" width="700" id="game3Img" onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
      </div>
    </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

//은서
document.querySelector("#game1Img").addEventListener("click", () => {
  goToRule1();
});

document.querySelector("#game2Img").addEventListener("click", () => {
  goToRule2();
});

document.querySelector("#game3Img").addEventListener("click", () => {
  goToRule3();
});

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//민석
function goToRule1() {
  document.querySelector("#rule1").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  selectTargetGame = "game1";
}
function goToRule2() {
  document.querySelector("#rule2").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  selectTargetGame = "game2";
}
function goToRule3() {
  document.querySelector("#rule3").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  selectTargetGame = "game3";
}

//은서
function imgOnMouseIn(elem) {
  elem.style.transform = "scale(1.05)";
  cursor: pointer;
}
function imgOnMouseOut(elem) {
  elem.style.transform = "scale(1)";
}
