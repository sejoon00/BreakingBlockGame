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

// 주석

//은서
change_position($('.popup')); // top 및 left 속성 변경

document.querySelector('').addEventListener('', () => {
  // 게임 클리어 이벤트로 변경
  let clearAudio = new Audio('.mp3'); // 게임 클리어 소리
  clearAudio.play();

  document.querySelector('#result').append('GAME CLEAR');
});

document.querySelector('').addEventListener('', () => {
  // 게임 오버 이벤트로 변경
  let overPageAudio = new Audio('.mp3'); // 게임 오버 소리
  overPageAudio.play();

  document.querySelector('#result').append('GAME OVER');
});

let str = '당신의 score는 ' + score + '점입니다.';
document.querySelector('#score').append(str);

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

//은서
function change_position(obj) {
  var l = ($(window).width() - obj.width) / 2;
  var t = ($(window).height() - obj.height) / 2;
  obj.css({ top: t, left: l });
}
