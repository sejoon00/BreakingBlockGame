// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <div id="settingPage">
        <div id = "charactercontainer">
            <button class = "left" onclick="goToGame1ByRalph()">
            <img src = "ralph.png">랄프</button>
            <button class = "right" onclick="goToGame1ByVanellope()">
            <img src = "lockedvanellope.png">바넬로피</button>
        </div>
    </div>
`
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

function moveToGame() {
  if (selectTargetGame == "game1") {
  }
}

function goToGame1ByRalph() {
  document.querySelector("#game1").style.display = "block";
  document.querySelector("#settingPage").style.display = "none";
  pageState = "Gaming";
  selectCharacter = "Ralph";
  setGame1();
}
// 곤용 잠금해제 되었을 떄만 사용가능
function goToGame1ByVanellope() {
  if (isCharacter == "true") {
    document.querySelector("#game1").style.display = "block";
    document.querySelector("#settingPage").style.display = "none";
    pageState = "Gaming";
    selectCharacter = "Vanellope";
    setGame1CanvasSize();
  } else if (isCharacter == "false") {
    alert("Character is locked");
  }
}
