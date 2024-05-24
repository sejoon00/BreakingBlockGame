class Item {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.dy = 2; // 아이템이 떨어지는 속도
    this.type = type; // 속도 증가, 공 개수 증가 등
    this.visible = true;
    this.image = new Image();
    //곤용 변경
    if (this.type === "speed") {
      this.image.src = "../source/speed_up_item.png"; // 속도 증가 아이템 이미지 경로
    } else if(this.type === "increaseball") {
      this.image.src = "../source/increase_item.png"; // 볼 개수 증가 아이템 이미지 경로
    } else if(this.type === "increaseheart") {
      this.image.src = "../source/increase_life.png"; // 생명 증가 아이템 이미지 경로
    } else if(this.type === "decreaseheart") {
      this.image.src = "../source/decrease_life.png"; // 생명 감소 아이템 이미지 경로
    } else if(this.type === "increasevanellopespeed") {
      this.image.src = "../source/increase_speed.png"; // 바넬로피 속도 증가 아이템 이미지 경로
    } else if(this.type === "decreasevanellopespeed") {
      this.image.src = "../source/decrease_speed.png"; // 바넬로피 속도 감소 아이템 아이템 이미지 경로
    } else if(this.type === "increasemonsterspeed") {
      this.image.src = "../source/increase_speed.png"; // 몬스터 속도 증가 아이템 이미지 경로
    } else if(this.type === "decreasemonsterspeed") {
      this.image.src = "../source/decrease_speed.png"; // 몬스터 속도 감소 아이템 이미지 경로
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
      return true;
    }
    return false;
  }
}
