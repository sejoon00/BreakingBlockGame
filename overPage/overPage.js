// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
      <div id="overPage" class="popup">
        <div id="result"></div>
        <div id="score"></div>
        <div id="gameclear">다음 레벨로 이동...</div>
        <div id="gameover">
          <div>PLAY AGAIN</div>
          <button onclick=gameOverPlayAgain()>YES</button>
          <button onclick=gameOverSetGameHide()>NO</button>
        </div>
      </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let overPage = document.querySelector("#overPage");
let gameclear = document.querySelector("#gameclear");
let gameover = document.querySelector("#gameover");

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function toggleOverPage() {
  let str = "당신의 score는 " + canvas.score + "점입니다.";
  if (gameMode.startsWith("Game")) {
    if (document.querySelector("#result").innerHTML != "") {
      document.querySelector("#result").innerHTML = "";
    }
    if ((gameclear.style.display = "block")) {
      gameclear.style.display = "none";
    }
    if ((gameover.style.display = "block")) {
      gameover.style.display = "none";
    }

    change_position(overPage);
    document.querySelector("#score").innerHTML = str;
    overPage.style.display = "block";

    if (gameMode === "GameClear") {
      gameMode = "Gaming";

      gameclear.style.display = "block";
      document.querySelector("#result").innerHTML = "GAME CLEAR";

      if (gameState === "Gaming1") {
        setTimeout(() => {
          gotoLevelUpForGame1();
        }, 3000);
      } else if (gameState === "Gaming2") {
        setTimeout(() => {
          gotoLevelUpForGame2();
        }, 3000);
      } else if (gameState === "Gaming3") {
        setTimeout(() => {
          gotoLevelUpForGame3();
        }, 3000);
      }
    } else if (gameMode === "GameOver") {
      gameMode = "";

      gameover.style.display = "block";
      document.querySelector("#result").innerHTML = "GAME OVER";
    }
  }
}

//은서
function change_position() {
  var l = (window.innerWidth - 500) / 2;
  var t = (window.innerHeight - 400) / 2;
  overPage.style.top = t + "px"; // CSS 속성 직접 설정
  overPage.style.left = l + "px"; // CSS 속성 직접 설정
}

function gotoLevelUpForGame1() {
  overPage.style.display = "none"; // 팝업창 종료
  endGame1(); // 게임 종료
  Game1Audio.pause(); // 게임 bgm 종료
  document.querySelector("#levelUp1").style.display = "block"; // levelup1 페이지로 이동
}
function gotoLevelUpForGame2() {
  overPage.style.display = "none"; // 팝업창 종료
  endGame2(); // 게임 종료
  Game2Audio.pause(); // 게임 bgm 종료
  document.querySelector("#levelUp2").style.display = "block"; // levelup1 페이지로 이동
}
function gotoLevelUpForGame3() {
  overPage.style.display = "none"; // 팝업창 종료
  endGame3(); // 게임 종료
  //Game3Audio.pause(); // 게임 bgm 종료
  document.querySelector("#levelUp3").style.display = "block"; // levelup1 페이지로 이동
}

function gameOverPlayAgain() {
  overPage.style.display = "none";
  // 게임 다시 시작
  if (gameState == "Gaming1") {
    endGame1();
    setGame1();
  } else if (gameState == "Gaming2") {
    endGame2();
    setGame2();
  } else if (gameState == "Gaming3") {
    endGame3();
    setGame3();
  }
}

function gameOverSetGameHide() {
  overPage.style.display = "none";
  if (gameState == "Gaming1") {
    endGame1();
  } else if (gameState == "Gaming2") {
    endGame2();
  } else if (gameState == "Gaming3") {
    endGame3();
  }

  //no 버튼 클릭 시 게임 hide해주고, 난이도 선택 화면으로 돌아가기
  moveToStagePage();
  gameState = "none";
}
