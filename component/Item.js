class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.dy = 2; // 아이템이 떨어지는 속도
    this.type = type; // 속도 증가, 공 개수 증가 등
    this.visible = true;
  }

  draw(ctx) {
    if (!this.visible) return;

    ctx.beginPath();
    ctx.rect(this.x - 10, this.y - 10, 20, 20);
    ctx.fillStyle = this.type === "speed" ? "blue" : "green";
    ctx.fill();
    ctx.closePath();
  }

  update(canvas) {
    if (!this.visible) return;

    this.y += this.dy;

    if (this.y > canvas.height) {
      this.visible = false; // 화면을 벗어나면 아이템 제거
    }
  }

  isPaddleGetItem(paddle) {
    if (
      this.visible &&
      this.x > paddle.x &&
      this.x < paddle.x + paddle.width &&
      this.y + 20 > paddle.y &&
      this.y < paddle.y + paddle.height
    ) {
      this.visible = false;
      return true;
    }
    return false;
  }
}
