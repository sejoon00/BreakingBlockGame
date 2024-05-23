class Bullet {
  constructor(canvas, x, y, dx, dy) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = 5;
    this.speed = 3;
    this.isRemoved = false;
  }

  draw() {
    this.context.beginPath();
    this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    this.context.fillStyle = "red"; // 총알 색상을 빨간색으로 변경
    this.context.fill();
    this.context.closePath();
  }

  update() {
    this.x += this.dx * this.speed;
    this.y += this.dy * this.speed;

    if (
      this.y > this.canvas.height ||
      this.x < 0 ||
      this.x > this.canvas.width
    ) {
      this.isRemoved = true;
    }
    this.draw(); // 업데이트 후 총알을 그립니다.
  }
}
