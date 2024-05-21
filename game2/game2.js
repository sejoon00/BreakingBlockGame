// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//민석
document.querySelector('main').insertAdjacentHTML(
  'afterbegin',
  `
    <div id="game2">
    </div>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let canvas2;

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

function setGame2() {
  // 특정 요소를 선택합니다.
  let game2 = document.querySelector('#game2');

  // 요소 내의 모든 자식 요소를 제거합니다.

  // 새로운 Canvas 객체를 생성하고 해당 요소에 추가합니다.
  canvas2 = new Canvas2('./game2/game2Background.png');
  canvas2.appendTo(game2);
}

function endGame1() {
  let game1 = document.querySelector('#game2');
  canvas2.removeFrom(game1);
}
