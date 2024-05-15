// ------------------------------------ HTML ------------------------------------
/* 해당 페이지의 HTML 코드를 작성하고 삽압하는 구간입니다. 주석이 잘 안보이니 자세히 확인부탁드립니다.*/

//세준
document.querySelector("main").insertAdjacentHTML(
  "afterbegin",
  `
    <div id="game1">
    </div>
  `
);

// ------------------------------------ javascript ------------------------------------
/* 해당 페이지의 javascript 코드를 작성하고 삽압하는 구간입니다.*/
let canvas;


// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

function setGame1() {
  canvas = new Canvas("./game1/game1Background.png");
  let game1 = document.querySelector("#game1");
  canvas.appendTo(game1);
}

function endGame1(){
  let game1 = document.querySelector("#game1");
  canvas.removeFrom(game1);
}



