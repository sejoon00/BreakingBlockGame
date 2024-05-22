class Game1_canvas {
  constructor(backgroundimageUrl) {
    console.log("hi");

    this.backgroundimageUrl = backgroundimageUrl;
    this.canvas = document.createElement("canvas");
    this.canvas.id = "game_canvas";
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

    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.backgroundimage.onload = () => {
      this.resizeCanvas(); // 초기 크기 조정
      this.ballInitialX = this.canvas.width / 2;
      this.ballInitialY = this.canvas.height - 100;
      this.drawBackground();
      this.initGameElements();
      this.startGameLoop();
    };
    this.backgroundimage.src = backgroundimageUrl;
  }

  // 주석

  drawBackground() {
    this.context.drawImage(
      this.backgroundimage,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }
  resizeCanvas() {
    let gameWidth = window.getComputedStyle(document.querySelector("#game"));

    console.log(gameWidth.width);
    this.canvas.width = parseFloat(gameWidth.width);
    this.canvas.height = this.canvas.width * 0.75;
    this.drawBackground(); // 캔버스 크기가 변경될 때마다 배경 다시 그리기
  }

  appendTo(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    element.appendChild(this.canvas);
  }

  removeFrom(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    element.removeChild(this.canvas);
  }

  // 점수 증가 함수
  increaseScore() {
    this.score += 100; // 점수를 10 증가시킵니다.
    console.log("score");
  }
  decreaseLife() {
    console.log("생명-1");

    if (this.lifes.length > 0) {
      this.lifes.pop(); // 생명 배열에서 하나를 제거합니다.
    }
  }

  // 점수를 화면에 표시하는 함수
  drawScore() {
    this.context.font = "24px Arial";
    this.context.fillStyle = "yellow";
    // this.context.strokeStyle = "black";
    this.context.lineWidth = 2;
    this.context.fillText("Score: " + this.score, this.canvas.width - 150, 35);
    // this.context.strokeText(
    //   "Score: " + this.score,
    //   this.canvas.width - 150,
    //   50
    // );
  }

  destroy() {
    // 리소스 정리 코드
    window.removeEventListener("resize", this.resizeCanvas.bind(this));
    this.balls = [];
    this.blocks = [];
    this.items = [];
    this.paddle = null;
    this.lifes = [];
  }

  //게임 내 요소들을 초기화합니다.
  initGameElements() {
    this.balls.push(
      new Ball(this.ballInitialX, this.ballInitialY, 1, -1, 10, "#0095DD")
    );
    console.log(this.balls);
    this.paddle = new Paddle(this.canvas, 100, 10, 10);

    this.paddle.bindMouseMove();

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
              this.increaseBrokenBlocks.bind(this)
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

    // 생명 배치
    for (let i = 0; i < 3; i++) {
      this.lifes.push(
        new Life(this.canvas, "../source/full_heart.png", 30, 10 + i * 40, 10)
      );
    }
  }

  //공 개수 증가 아이템을 먹을시 추가 공을 화면에 그리는 함수
  addBall(dx, dy, radius, color) {
    const newBall = new Ball(x, y, dx, dy, radius, color);
    this.balls.push(newBall);
  }

  // 부서진 블록 수 증가 함수
  increaseBrokenBlocks() {
    this.brokenBlocks++;
    if (this.brokenBlocks === this.blocks.length) {
      this.endGame(); // 모든 블록이 부서졌을 때 게임 종료
    }
  }
  // 게임 종료 함수
  endGame() {
    alert("Congratulations! You've destroyed all the blocks!");
    this.destroy();
  }

  //화면에 요소들을 일정주기마다 다시 그립니다.
  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기
      this.blocks.forEach((block) => {
        block.draw(this.context); // 블록 그리기
      });

      //민석 - 공이 땅에 떨어진거 필터링해서 다시 공 배열 업데이트해줌
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
      //민석 - 공이 땅에 떨어지면 생명 배열에서 삭제
      // const numRemovedBalls = this.balls.reduce((acc, ball) => {
      //   if (ball.isRemoved) {
      //     acc++;
      //   }
      //   return acc;
      // }, 0);

      // this.lifes.splice(0, numRemovedBalls);

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
      if (this.paddle != null) this.paddle.draw(); // 막대기 그리기 추가

      this.lifes.forEach((life) => {
        life.draw(); // 생명 그리기 추가
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

      this.drawScore(); // 점수 그리기 추가
      requestAnimationFrame(update);
    };
    update();
  }

  togglePause() {
    this.isPaused = !this.isPaused;
    if (!this.isPaused) {
      this.startGameLoop(); // 일시 중지 해제 시 게임 루프 재개
    }
  }
}