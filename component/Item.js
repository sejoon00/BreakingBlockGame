class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.dy = 2; // 아이템이 떨어지는 속도
    this.type = type; // 속도 증가, 공 개수 증가 등
    this.visible = true;
    this.image = new Image();
    if (this.type === "speed") {
      this.image.src = "../source/speed_up_item.png"; // 속도 증가 아이템 이미지 경로
    } else if (this.type === "ball") {
      this.image.src = "../source/increase_item.png"; // 다른 아이템 이미지 경로
    } else {
      this.image.src = "../source/light_item.png"; // 다른 아이템 이미지 경로
    }
  }

  draw(ctx) {
    if (!this.visible) return;

    ctx.drawImage(this.image, this.x - 10, this.y - 10, 40, 40);
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
      let itemAudio = new Audio(
        'https://taira-komori.jpn.org/sound_os2/game01/powerup01.mp3'
        );
      itemAudio.play();
      return true;
    }
    return false;
  }
}
