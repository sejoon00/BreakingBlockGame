// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
    "afterbegin",
    `
    <section id="rule2">
      <div id="instruction2">
        <img src="./source/xlogo.png" width="30" class="close-btn" onclick="goToSettingPageForGame22()"></img>
        <div id="instr-title2">INSTRUCTION</div>
        
        <div id="instr2">
          <p>rule2임</p>
          <p>각 레벨에는 다양한 도전 과제가 있으며, 빠른 속도와 정확한 판단이 필요합니다.</p>
          <p>마우스를 사용하여 블록을 이동시키고, 세 개 이상의 동일한 색상 블록을 일렬로 배치하여 제거하세요.</p>
          <p>제한 시간이 있으므로 빠르게 움직여 보세요. 모든 레벨을 클리어하면 게임이 완료됩니다.</p>
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
}