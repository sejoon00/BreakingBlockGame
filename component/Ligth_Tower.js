class LightTower {
  constructor(x, y, width, height, imageSrc) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.image = new Image();
    this.image.src = imageSrc;
    this.isDestroying = false; // 블록 파괴 범위 표시 여부
    this.destroyingTimer = null; // 타이머를 관리하기 위한 변수
  }

  draw(ctx) {
    // ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  checkAndDestroyBlocks(blocks) {
    const rangeX = this.x + this.width / 2;
    const rangeY = this.y + this.height / 2;
    console.log("빛의 아이템 먹음");
    for (let i = 0; i < 10; i++) {
      blocks.shift();
    }
    this.isDestroying = true; // 파괴 범위 표시 시작
    clearTimeout(this.destroyingTimer);
    this.destroyingTimer = setTimeout(() => {
      this.isDestroying = false; // 파괴 범위 표시 종료
    }, 500); // 0.5초 후에 파괴 범위 표시 종료
  }

  drawDestroyingRange(ctx) {
    if (this.isDestroying) {
      ctx.save();
      ctx.globalAlpha = 0.5; // 반투명도 설정
      ctx.fillStyle = "white";
      ctx.fillRect(
        this.x - 6000,
        this.y - 6000,
        this.width + 10000,
        this.height + 10000
      ); // 범위 그리기
      ctx.restore();
    }
  }
}
