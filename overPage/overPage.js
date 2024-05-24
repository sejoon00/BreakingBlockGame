// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//은서
document.querySelector('main').insertAdjacentHTML(
  'afterbegin',
  `
      <div id="overPage" class="popup">
        <div id="result"></div>
        <div id="score"></div>
        <div>PLAY AGAIN</div>
        <button onclick=moveToStagePage()>YES</button>
        <button onclick=setGameHide()>NO</button>
      </div>
    `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let 캔버스 = document.querySelector('#game1_canvas');
let 캔버스2 = document.querySelector('#game2_canvas');
let 캔버스3 = document.querySelector('#game3_canvas');

//은서
window.addEventListener('DOMContentLoaded', () => {
  // overPage 요소를 선택
  let overPage = document.querySelector('#overPage');

  // 게임 상태에 따른 결과 표시
  if (gameState === 'GameClear') {
      document.querySelector('#result').append('GAME CLEAR');
  } else if (gameState === 'GameOver') {
      document.querySelector('#result').append('GAME OVER');
  }

  // 점수 표시
  let str = '당신의 score는 ' + canvas.score + '점입니다.';
  document.querySelector('#score').append(str);

  // 위치 변경 함수 호출
  change_position(overPage);
});

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//은서
var l = (window.innerWidth - 500) / 2;
var t = (window.innerHeight - 400) / 2;
overPage.style.top = t + 'px'; // CSS 속성 직접 설정
overPage.style.left = l + 'px'; // CSS 속성 직접 설정