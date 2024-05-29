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
        <img src="./stagePage/HeroDuty.png" width="700" id="game3Img" onmouseover="imgOnMouseIn (this)" onmouseout="imgOnMouseOut (this)">
      </div>
      <div id="stageLockMessage">This stage is locked!</div>
    </div>
    <button id="settings-btn" font-size: 35px;">Settings</button>

    <div id="popup-overlay"></div>
    <div id="popup">
      <div id="popup-container">
        <h2>Settings</h2>
        <p style="margin-top: 30px; font-size: 25px;">게임 환경 설정</p>
        <label style="margin-top: 50px; font-size: 25px;">Choose BGM:</label><br>
        <div>
        <label class="custom-checkbox" >
          <input type="radio" id="bgm1" name="bgm" value="bgm1" checked>
          <label for="bgm1">BGM 1</label><br>
          <span class="checkmark"></span>
        </label>
        <label class="custom-checkbox">
          <input type="radio" id="bgm2" name="bgm" value="bgm2">
          <label for="bgm2">BGM 2</label><br>
          <span class="checkmark"></span>
        </label>
        
        </div>

        <label style="margin-top: 50px; font-size: 25px;">Choose Ball Image:</label><br>
        <div>
        <label class="custom-checkbox">
          <input type="radio" id="ball1" name="ball" value="ball1" checked>
          <label for="ball1"><img src="../source/ball1.png"></img></label><br>
          <span class="checkmark"></span>
        </label>
        <label class="custom-checkbox">
          <input type="radio" id="ball2" name="ball" value="ball2">
          <label for="ball2"><img src="../source/ball2.png"></img></label><br>
          <span class="checkmark"></span>
          </label>
        </div>
        <button id="close-popup">Close</button>
      </div>
    </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let game1Img = document.querySelector("#game1Img");
let game2Img = document.querySelector("#game2Img");
let game3Img = document.querySelector("#game3Img");
let stageLockMessage = document.querySelector("#stageLockMessage");

if (isGame1Cleared) {
  game2Img.src = "../stagePage/SugarRush2.png";
} else {
  game2Img.src = "../stagePage/SugarRush.png";
}

if (isGame1Cleared && isGame2Cleared) {
  game3Img.src = "../stagePage/HeroDuty2.png";
} else {
  game3Img.src = "../stagePage/HeroDuty.png";
}

//은서
game1Img.addEventListener("click", () => {
  goToRule1();
});

game2Img.addEventListener("click", () => {
  if (isGame1Cleared) {
    goToRule2();
  } else {
    stageLockMessage.style.display = "block";
    setTimeout(() => {
      stageLockMessage.style.display = "none";
    }, 500);
  }
});

game3Img.addEventListener("click", () => {
  if (isGame1Cleared && isGame2Cleared) {
    goToRule3();
  } else {
    stageLockMessage.style.display = "block";
    setTimeout(() => {
      stageLockMessage.style.display = "none";
    }, 500);
  }
});

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//민석
function goToRule1() {
  document.querySelector("#rule1").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  document.querySelector("#settings-btn").style.display = "none";

  selectTargetGame = "game1";
}
function goToRule2() {
  document.querySelector("#rule2").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  document.querySelector("#settings-btn").style.display = "none";

  selectTargetGame = "game2";
}
function goToRule3() {
  document.querySelector("#rule3").style.display = "block";
  document.querySelector("#selectGame").style.display = "none";
  document.querySelector("#settings-btn").style.display = "none";

  selectTargetGame = "game3";
}

//은서
function imgOnMouseIn(elem) {
  elem.style.transform = "scale(1.05)";
  elem.style.cursor = "pointer";
}
function imgOnMouseOut(elem) {
  elem.style.transform = "scale(1)";
}

// 팝업 기능 추가
document.querySelector("#settings-btn").addEventListener("click", () => {
  document.querySelector("#popup-overlay").style.display = "block";
  document.querySelector("#popup").style.display = "block";
});

document.querySelector("#close-popup").addEventListener("click", () => {
  document.querySelector("#popup-overlay").style.display = "none";
  document.querySelector("#popup").style.display = "none";
});

// BGM 및 공 이미지 선택 기능 추가
document.querySelectorAll('input[name="bgm"]').forEach((elem) => {
  elem.addEventListener("change", (event) => {
    let selectedBGM = event.target.value;
    switch (selectedBGM) {
      case "bgm1":
        startPageAudio.src = "./source/WreckItRalph_StartPage.mp3";
        startPageAudio.play();
        break;
      case "bgm2":
        startPageAudio.src = "./source/bgm2.mp3";
        startPageAudio.play();
        break;
    }
  });
});

document.querySelectorAll('input[name="ball"]').forEach((elem) => {
  elem.addEventListener("change", (event) => {
    let selectedBallImg = event.target.value;
    switch (selectedBallImg) {
      case "ball1":
        // 공 이미지 1로 변경
        ballImageSrc = "ball1";
        break;
      case "ball2":
        // 공 이미지 2로 변경
        ballImageSrc = "ball2";
        break;
    }
  });
});
