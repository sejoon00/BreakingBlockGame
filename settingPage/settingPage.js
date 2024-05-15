// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
  <div id="settingPage">
      <div id = "text3">Choose your Character!</div>
        <div id = "charactercontainer">  
          <button class = "left" onclick="goToGame1ByRalph()">
          <img src = "./source/selectRalph.png">
          <button class = "right" onclick="goToGame1ByVanellope()">
          <img src = "./source/lockedVanellope.png">
        </div>
        <div id="lockMessage">Character is locked!</div>
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
  pageState = "Gaming";   //게임중으로 상태 변경
  document.querySelector("#game1").style.display = "block";
  document.querySelector("#settingPage").style.display = "none";
  pageState = "Gaming";
  selectCharacter = "Ralph";
  setGame1();
}
// 곤용 잠금해제 되었을 떄만 사용가능
function goToGame1ByVanellope() {
  pageState = "Gaming";   //게임중으로 상태 변경
  if (isCharacter === "true") {
    document.querySelector("#game1").style.display = "block";
    document.querySelector("#settingPage").style.display = "none";
    pageState = "Gaming";
    selectCharacter = "Vanellope";
    setGame1CanvasSize();
  } else  {
    document.querySelector("#lockMessage").style.display = "block";
  }
}
