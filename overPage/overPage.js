// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector('main').insertAdjacentHTML(
  'afterbegin',
  `
      <div id="overPage" class="popup">
        <div id="result"></div>
        <div id="score"></div>
        <div id="gameclear">다음 레벨로 이동...</div>
        <div id="gameover">
          <div>PLAY AGAIN</div>
          <button onclick=moveToStagePage()>YES</button>
          <button onclick=overPageSetGameHide()>NO</button>
        </div>
      </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function toggleOverPage() {
  if (gameMode.startsWith("Game")) {
    if(document.querySelector('#result').innerHTML != '') {
      document.querySelector('#result').innerHTML = '';
    }
    
    const overPage = document.querySelector("#overPage");
    let str = '당신의 score는 ' + canvas.score + '점입니다.';

    change_position(overPage);
    document.querySelector('#score').innerHTML = str;
    overPage.style.display = 'block';

    if (gameMode === "GameClear")
    {
      gameMode = 'Gaming';
      const gameclear = document.querySelector("#gameclear");
      gameclear.style.display = "block";
      document.querySelector('#result').innerHTML = 'GAME CLEAR';

      if (gameState === 'Gaming1') {
      setTimeout(() => {
        gotoLevelUpForGame1();
      }, 3000);
      }
      else if (gameState === 'Gaming2') {
        setTimeout(() => {
          gotoLevelUpForGame2();
        }, 3000);
      }
      else if (gameState === 'Gaming3') {
        setTimeout(() => {
          gotoLevelUpForGame3();
        }, 3000);
      }
    }
    else if (gameMode === "GameOver")
    {
      gameMode = '';
      const gameover = document.querySelector("#gameover");
      gameover.style.display = "block";
      document.querySelector('#result').innerHTML = 'GAME OVER';
    }
  }
}


//은서
function change_position() {
  var l = (window.innerWidth - 500) / 2;
  var t = (window.innerHeight - 400) / 2;
  overPage.style.top = t + 'px'; // CSS 속성 직접 설정
  overPage.style.left = l + 'px'; // CSS 속성 직접 설정
}

function gotoLevelUpForGame1() {
  overPage.style.display = 'none'; // 팝업창 종료
  endGame1(); // 게임 종료
  Game1Audio.pause(); // 게임 bgm 종료
  document.querySelector('#levelUp1').style.display = 'block'; // levelup1 페이지로 이동
}
function gotoLevelUpForGame2() {
  overPage.style.display = 'none'; // 팝업창 종료
  endGame2(); // 게임 종료
  Game2Audio.pause(); // 게임 bgm 종료
  document.querySelector('#levelUp2').style.display = 'block'; // levelup1 페이지로 이동
}
function gotoLevelUpForGame3() {
  overPage.style.display = 'none'; // 팝업창 종료
  endGame3(); // 게임 종료
  //Game3Audio.pause(); // 게임 bgm 종료
  document.querySelector('#levelUp3').style.display = 'block'; // levelup1 페이지로 이동
}

function overPageSetGameHide() {
  Game1Audio.pause();
  Game1Audio.currentTime = 0;
  Game2Audio.pause();
  Game2Audio.currentTime = 0;
  Game3Audio.pause();
  Game3Audio.currentTime = 0;

  //no 버튼 클릭 시 게임 hide해주고, 난이도 선택 화면으로 돌아가기
  moveToStagePage();

  document.querySelector("#overPage").style.display = "none";
  // 특정 요소를 선택하고 제거합니다.
  let game = document.querySelector("#game");
  let game_canvas = document.querySelector("#game_canvas");
  console.log(game_canvas);

  // canvas 객체 정리
  if (canvas) {
    canvas.destroy();
    canvas = null;
  }

  if (game) {
    game.style.display = "none";
    game.remove();
    // game_canvas.display = "none";
  }
  gameState = "none";
}