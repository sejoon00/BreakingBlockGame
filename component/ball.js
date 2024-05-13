class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(canvas, blocks) {
    // 캔버스 경계 체크하여 방향 반전
    if (this.x + this.dx > canvas.width - this.radius || this.x + this.dx < this.radius) {
      this.dx = -this.dx;
    }
    if (this.y + this.dy > canvas.height - this.radius || this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    }

    // 이동 전 충돌 검사
    blocks.forEach(block => {
      if (block.visible && block.isHit(this)) {
        // 충돌 처리는 isHit 내에서 수행됨
      }
    });

    // 공 위치 업데이트
    this.x += this.dx;
    this.y += this.dy;
  }
}
