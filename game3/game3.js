// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
      <div id="game3">
        <h1>Game3</h1>
      </div>
      `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let canvas3;

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/
function setGame3() {
  // 특정 요소를 선택합니다.
  let game3 = document.querySelector('#game3');

  // 요소 내의 모든 자식 요소를 제거합니다.
  while (game3.firstChild) {
    game3.removeChild(game3.firstChild);
  }

  // 새로운 Canvas 객체를 생성하고 해당 요소에 추가합니다.
  canvas3 = new Game3_canvas('./game3/game3Background.png');
  canvas3.appendTo(game3);
}

function endGame3() {
  let game3 = document.querySelector('#game3');
  canvas3.removeFrom(game3);
}