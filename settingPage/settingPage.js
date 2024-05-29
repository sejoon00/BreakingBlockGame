// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
  <div id="settingPage">
      <div id="text3">Choose your Character!</div>
        <div id="charactercontainer">
          <div class="left" onclick="moveToGameWithRalph()" onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
            <img id="settingRalph" src="./source/selectRalph.png">
          </div>
          <div class = "right" onclick="moveToGameWithVanellope()" onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
            <img id="settingVanellope" src = "./source/lockedVanellope.png">
          </div>
        </div>
        <div id="lockMessage">Character is locked!</div>
    </div>
  
`
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let lockMessage = document.querySelector("#lockMessage");

if (isGame2Cleared && isGame1Cleared) {
  settingVanellope.src = "./source/vanellope.png";
} else {
  settingVanellope.src = "./source/lockedVanellope.png";
}

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function moveToGameWithRalph() {
  if (selectTargetGame == "game1") {
    goToGame1ByRalph();
  } else if (selectTargetGame == "game2") {
    goToGame2ByRalph();
  } else if (selectTargetGame == "game3") {
    console.log("selectTargetGame");
    goToGame3ByRalph();
  }
  startPageAudio.pause(); // 노래 중단
}

function moveToGameWithVanellope() {
  if (selectTargetGame == "game1") {
    goToGame1ByVanellope();
  } else if (selectTargetGame == "game2") {
    goToGame2ByVanellope();
  } else if (selectTargetGame == "game3") {
    goToGame3ByVanellope();
  }
  startPageAudio.pause(); // 노래 중단
}

function goToGame1ByRalph() {
  gameState = "Gaming1"; //게임중으로 상태 변경
  document.querySelector("#settingPage").style.display = "none";
  gameState = "Gaming1";
  selectCharacter = "Ralph";
  setGame1();
  //document.querySelector('#game').style.display = 'block';
}

// 곤용 잠금해제 되었을 때만 사용가능
function goToGame1ByVanellope() {
  gameState = "Gaming1"; //게임중으로 상태 변경
  if (isGame2Cleared) {
    document.querySelector("#settingPage").style.display = "none";
    gameState = "Gaming1";
    selectCharacter = "Vanellope";
    setGame1();
  } else {
    lockMessage.style.display = "block";
    setTimeout(() => {
      lockMessage.style.display = "none";
    }, 2000); // Character is locked! 메시지 출력
  }
}

function goToGame2ByRalph() {
  gameState = "Gaming2"; //게임중으로 상태 변경
  document.querySelector("#settingPage").style.display = "none";
  selectCharacter = "Ralph";
  setGame2();
  document.querySelector("#game").style.display = "block";
}

function goToGame2ByVanellope() {
  lockMessage.style.display = "block";
  setTimeout(() => {
    lockMessage.style.display = "none";
  }, 2000); // Character is locked! 메시지 출력
}

function goToGame3ByRalph() {
  gameState = "Gaming3"; //게임중으로 상태 변경

  document.querySelector("#settingPage").style.display = "none";
  selectCharacter = "Ralph";
  setGame3();
  document.querySelector("#game").style.display = "block";
}
function goToGame3ByVanellope() {
  console.log("goToGame3ByVanellope");
  document.querySelector("#settingPage").style.display = "none";
  gameState = "Gaming3";
  selectCharacter = "Vanellope";
  setGame3();
  document.querySelector("#game").style.display = "block";
}
