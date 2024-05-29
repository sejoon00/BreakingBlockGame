// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <section id="rule1">
      <div id="instruction1">
        <img src="./source/xlogo.png" width="30" class="close-btn" onclick="goToSettingPageForGame11()"></img>
        
        <div id="instr1">
         <div id="instr-title1">INSTRUCTION</div>

          <p>이 게임은 "다부셔 랄프!" 게임입니다. 목표는 모든 창문을 깨드리는 것입니다.</p>
          <p></p>
          <p>마우스를 사용하여 랄프를 움직여 공을 쳐내세요!</p>
          <p>모든 창문을 공으로 깨트리면 Clear!</p>
          <img src="../source/rule1.png">
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
function goToSettingPageForGame11() {
  document.querySelector("#settingPage").style.display = "block";
  document.querySelector("#rule1").style.display = "none";
  selectTargetGame = "game1";
  if (isGame2Cleared && isGame1Cleared) {
    settingVanellope.src = "./source/vanellope.png";
  }
}
