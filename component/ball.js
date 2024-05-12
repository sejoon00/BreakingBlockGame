class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x; // x 좌표
    this.y = y; // y 좌표
    this.dx = dx; // x 방향 속도
    this.dy = dy; // y 방향 속도
    this.radius = radius; // 공 반지름
    this.color = color; // 공 색상
  }

  // 공 그리기 메서드
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // 공 업데이트 메서드
  update(canvas) {
    this.x += this.dx;
    this.y += this.dy;

    // 캔버스 경계 체크하여 방향 반전
    if (
      this.x + this.dx > canvas.width - this.radius ||
      this.x + this.dx < this.radius
    ) {
      this.dx = -this.dx;
    }
    if (
      this.y + this.dy > canvas.height - this.radius ||
      this.y + this.dy < this.radius
    ) {
      this.dy = -this.dy;
    }
  }
}

// const canvas = document.getElementById("game1_canvas");
// const ctx = canvas.getContext("2d");

// const balls = [];
// balls.push(new Ball(100, 100, 2, 2, 10, "#0095DD"));
// balls.push(new Ball(200, 100, -1, 3, 15, "#FF5733"));
// balls.push(new Ball(400, 200, 3, -2, 20, "#33FF55"));

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);

//   balls.forEach((ball) => {
//     ball.draw(ctx);
//     ball.update(canvas);
//   });

//   requestAnimationFrame(draw);
// }

// draw();
