class Game1_canvas extends Canvas {
  constructor(backgroundimageUrl) {
    super(backgroundimageUrl);
    this.canvas.id = "game1_canvas"; // canvas id 변경
  }

  // 기존 initGameElements 메서드를 재정의하여 추가 블록을 생성
  initGameElements() {
    super.initGameElements();
    // 추가로 필요한 블록이나 요소를 여기에 추가
    // 블록의 시작 y 위치
    let startY = 116;
    const blockWidth = 38;
    const blockHeight = 28;
    const blockSpacingX = 45; // 블록 간 x 간격
    const blockSpacingY = 30; // 블록 간 y 간격

    // 블록 배치
    for (let row = 0; row < 4; row++) {
      for (let innerRow = 0; innerRow < 2; innerRow++) {
        let startX = 297; // 블록의 시작 x 위치
        let numBlocks = row < 2 ? 5 : 4; // 각 행의 블록 수

        for (let i = 0; i < numBlocks; i++) {
          this.blocks.push(
            new Block(
              startX,
              startY,
              blockWidth,
              blockHeight,
              this.increaseBrokenBlocks.bind(this),
              "../source/window.png"
            )
          );
          // x좌표 조정
          if (i === 0) startX += blockWidth + 40;
          else startX += blockWidth + blockSpacingX;
          if (row > 1 && i === 1) startX += blockWidth + blockSpacingX;
        }
        // 다음 행으로 이동
        startY += blockHeight + 5; // innerRow 5px 간격
      }
      startY += blockHeight + blockSpacingY; // Row 30px 간격
      if (row === 1) startY -= 5;
      if (row === 2) startY -= 16;
    }
  }

  // 게임 루프 내에서 drawPath를 호출하여 경로를 그림
  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기
      this.blocks.forEach((block) => {
        block.draw(this.context); // 블록 그리기
      });

      this.balls = this.balls.filter((ball) => {
        ball.update(
          this.canvas,
          this.blocks,
          this.paddle,
          this.items,
          this.increaseScore.bind(this),
          this.decreaseLife.bind(this)
        );
        return !ball.isRemoved;
      });

      this.balls.forEach((ball) => {
        ball.draw(this.context);
        ball.update(
          this.canvas,
          this.blocks,
          this.paddle,
          this.items,
          this.increaseScore.bind(this),
          this.decreaseLife.bind(this)
        );
      });

      this.paddle.draw();

      this.lifes.forEach((life) => {
        life.draw();
      });

      this.items.forEach((item) => {
        item.draw(this.context);
        item.update(this.canvas);
      });

      this.items.forEach((item) => {
        this.balls.forEach((ball) =>
          this.paddle.collectItem(item, ball, this.balls)
        );
      });

      this.drawScore();
      requestAnimationFrame(update);
    };
    update();
  }
}