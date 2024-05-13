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
        <img src="./stagePage/WreckItRalph.png" width="700" id="game1Img" onclick=goToSettingPageForGame1() onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
        <img src="./stagePage/SugarRush.png" width="700" id="game2Img" onclick=goToSettingPageForGame2()>
        <img src="./stagePage/Hero'sDuty.png" width="700" id="game3Img" onclick=goToSettingPageForGame3()>
      </div>
    </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//민석
function goToSettingPageForGame1() {
  document.querySelector("#settingPage").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  selectTargetGame = "game1";
  pageState = "Gaming";
}
function goToSettingPageForGame2() {
  document.querySelector("#settingPage").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  selectTargetGame = "game2";
  pageState = "Gaming";
}
function goToSettingPageForGame3() {
  document.querySelector("#settingPage").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  selectTargetGame = "game3";
  pageState = "Gaming";
}

//은서
function imgOnMouseIn(elem) {
  elem.style.width= "750px";
}
function imgOnMouseOut(elem) {
  elem.style.width= "";
}
function StagePagePlayAudio() {
  let audio = new Audio("./sound/WreckItRalph_StartPage.mp3");
  audio.play();
}