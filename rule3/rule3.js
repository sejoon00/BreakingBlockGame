// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <section id="rule3">
      <div id="instruction3">
        <img src="./source/xlogo.png" width="30" class="close-btn" onclick="goToSettingPageForGame33()"></img>
        
        <div id="instr3">
          <div id="instr-title1">INSTRUCTION</div>

          <p>이 게임은 "Hero's Duty" 게임입니다. 목표는 본진으로 쳐들어오는 사이버그들을 막고 캔디 버그 보스를 헤치우는 것 입니다.</p>
          <p>마우스를 사용하여 랄프를 움직여 공을 쳐내 몰려오는 사이버그들과 캔디 버그를 헤치워주세요!</p>
          <p>캔디 버그 보스를 죽이면 Clear!</p>
          <img src="../source/rule3.png">
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
function goToSettingPageForGame33() {
  document.querySelector("#settingPage").style.display = "block";
  document.querySelector("#rule3").style.display = "none";
  selectTargetGame = "game3";
}
