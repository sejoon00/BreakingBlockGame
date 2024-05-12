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

// ---------------------------------- javascript function ----------------------------------
/* 해당 페이지의 javascript에서 사용하는 function을 정의하는 구간입니다.*/

function setGame1() {
  let canvas = new Canvas("./game1/game1Background.png");
  let game1 = document.querySelector("#game1");
  canvas.appendTo(game1);
}

const canvas = document.getElementById("game1_canvas");
const ctx = canvas.getContext("2d");

const balls = [];
balls.push(new Ball(100, 100, 2, 2, 10, "#0095DD"));
balls.push(new Ball(200, 100, -1, 3, 15, "#FF5733"));
balls.push(new Ball(400, 200, 3, -2, 20, "#33FF55"));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.draw(ctx);
    ball.update(canvas);
  });

  requestAnimationFrame(draw);
}

draw();
