// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/
//a
//세준
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <div id="game1">
      <div id="game1_container">
        <img id="game1_backgroundImg" src="./game1Background.png" alt="Background Image">
      </div>
    </div>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let canvas;

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

function setGame1() {
  // 특정 요소를 선택합니다.
  let game1 = document.querySelector("#game1");

  // 요소 내의 모든 자식 요소를 제거합니다.
  while (game1.firstChild) {
    game1.removeChild(game1.firstChild);
  }

  // 새로운 Canvas 객체를 생성하고 해당 요소에 추가합니다.
  canvas = new Canvas("./game1/game1Background.png");
  canvas.appendTo(game1);
}

function endGame1() {
  let game1 = document.querySelector("#game1");
  canvas.removeFrom(game1);
}
