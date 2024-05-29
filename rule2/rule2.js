// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <section id="rule2">
      <div id="instruction2">
        <img src="./source/xlogo.png" width="30" class="close-btn" onclick="goToSettingPageForGame22()"></img>
        
        <div id="instr2">
          <div id="instr-title1">INSTRUCTION</div>

          <p>이 게임은 "슈가 러쉬" 게임입니다. 목표는 다른 빌런 레이서들 보다 먼저 왼쪽 결승지점에 도달하는 것 입니다!</p>
          <p>마우스를 사용하여 랄프를 움직여 공을 쳐내 다른 빌런 레이서들을 없애주세요!</p>
          <p>바넬로피가 가장 먼저 결승점에 들어오면 Clear!</p>
          <img src="../source/rule2.png">
        </div>
      </div>
    </section>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

//
// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function goToSettingPageForGame22() {
  document.querySelector("#settingPage").style.display = "block";
  document.querySelector("#rule2").style.display = "none";
  selectTargetGame = "game2";
  if (isGame2Cleared && isGame1Cleared) {
    settingVanellope.src = "./source/vanellope.png";
  }
}
