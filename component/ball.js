class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.isRemoved = false; // 공 제거 여부를 표시하는 속성 추가
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(canvas, blocks, paddle, items, increaseScore, decreaseLife) {
    // 캔버스 좌우 경계 체크하여 방향 반전
    if (
      this.x + this.dx > canvas.width - this.radius ||
      this.x + this.dx < this.radius
    ) {
      this.dx = -this.dx;
    }
    // 캔버스 상단 경계 체크하여 방향 반전
    if (this.y + this.dy < this.radius) {
      this.dy = -this.dy;
    }
    // 캔버스 하단 경계 체크 (공이 화면 아래로 떨어지는 경우)
    if (this.y + this.dy > canvas.height - this.radius) {
      // 공을 제거할 플래그 설정
      this.isRemoved = true;
      console.log("땅에 닿았음");
      decreaseLife();
      return;
    }

    // 이동 전 충돌 검사
    blocks.forEach((block) => {
      block.visible && block.isHit(this, items, increaseScore);
    });

    if (paddle.isHitPaddle(this)) {
      // 패들과의 충돌 처리

      let paddleAudio = new Audio(
        "https://taira-komori.jpn.org/sound_os2/game01/jump09.mp3"
      );
      paddleAudio.play();
    }

    // 공 위치 업데이트
    this.x += this.dx;
    this.y += this.dy;
  }
}
