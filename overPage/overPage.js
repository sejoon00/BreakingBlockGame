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
          <button onclick=setGameHide()>NO</button>
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
    
    const overPage = document.querySelector("#overPage");
    let str = '당신의 score는 ' + canvas.score + '점입니다.';

    change_position(overPage);
    document.querySelector('#score').innerHTML = str;
    overPage.style.display = 'block';

    if (gameMode === "GameClear")
    {
      const gameclear = document.querySelector("#gameclear");
      gameclear.style.display = "block";
      document.querySelector('#result').append('GAME CLEAR');

    }
    else if (gameMode === "GameOver")
    {
      const gameover = document.querySelector("#gameover");
      gameover.style.display = "block";
      document.querySelector('#result').append('GAME OVER');
    }
    else {}
  }
}

//은서
function change_position() {
  var l = (window.innerWidth - 500) / 2;
  var t = (window.innerHeight - 400) / 2;
  overPage.style.top = t + 'px'; // CSS 속성 직접 설정
  overPage.style.left = l + 'px'; // CSS 속성 직접 설정
}

levelUp2.style.display = 'block';