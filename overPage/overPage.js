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

//은서
 // top 및 left 속성 변경

let overPage = document.querySelector('#overPage');
console.log(gameState);


if (gameState ==='GameClear') {
  change_position(overPage);
  document.querySelector('#result').append('GAME CLEAR');
}

if (gameState === 'GameOver') {
  change_position(overPage);
  document.querySelector('#result').append('GAME OVER');
}

let str = '당신의 score는 ' + score + '점입니다.';
document.querySelector('#score').append(str);

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//은서
var l = (window.innerWidth - overPage.offsetWidth) / 2;
var t = (window.innerHeight - overPage.offsetHeight) / 2;
overPage.style.top = t + 'px'; // CSS 속성 직접 설정
overPage.style.left = l + 'px'; // CSS 속성 직접 설정
console.log(overPage.offsetWidth);