class Game3_canvas extends Canvas {
  constructor(backgroundimageUrl) {
<<<<<<< HEAD
    console.log("hi");
    this.backgroundimageUrl = backgroundimageUrl;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "game3_canvas";
    this.context = this.canvas.getContext("2d");
    this.backgroundimage = new Image();
    this.ballInitialX;
    this.ballInitialY;
    this.balls = []; // 공 리스트 초기화
    this.blocks = []; // 블록 리스트 초기화
    this.items = []; // 아이템 리스트 초기화
    this.paddle; // 막대기 초기화
    this.lifes = []; // 생명 초기화
    this.score = 0; // 점수 초기화
    this.brokenBlocks = 0; // 부서진 블록 수 초기화
    this.tower = null;
=======
    super(backgroundimageUrl);
    this.canvas.id = "game3_canvas"; // canvas id 변경
>>>>>>> origin/game3/master
    this.path = [
      { x: 50, y: 100 },
      { x: 300, y: 100 },
      { x: 300, y: 300 },
      { x: 550, y: 300 },
      { x: 550, y: 500 },
      { x: 750, y: 500 },
    ]; // 적 이동 경로
    this.tower = null; // 추가 필드
  }

  // 적 이동 경로를 그리는 메서드 추가
  drawPath() {
    this.context.beginPath();
    this.context.moveTo(this.path[0].x, this.path[0].y);
    for (let i = 1; i < this.path.length; i++) {
      this.context.lineTo(this.path[i].x, this.path[i].y);
    }
    this.context.strokeStyle = "green";
    this.context.lineWidth = 5;
    this.context.stroke();
  }

  // 기존 initGameElements 메서드를 재정의하여 추가 블록을 생성
  initGameElements() {
    super.initGameElements();
    // 추가로 필요한 블록이나 요소를 여기에 추가
    this.blocks.push(
      new Block3(50, 50, 40, 40, this.increaseBrokenBlocks.bind(this), "red")
    );
    console.log("New block added in Game3_canvas");
  }

  // 게임 루프 내에서 drawPath를 호출하여 경로를 그림
  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기
      this.drawPath(); // 경로 그리기 추가
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
