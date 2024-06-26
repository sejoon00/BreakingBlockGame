class Canvas {
  constructor(backgroundimageUrl) {
    this.backgroundimageUrl = backgroundimageUrl;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'game_canvas';
    this.context = this.canvas.getContext('2d');
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

    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.backgroundimage.onload = () => {
      this.resizeCanvas(); // 초기 크기 조정
      this.ballInitialX = this.canvas.width / 2;
      this.ballInitialY = this.canvas.height - 160;
      this.drawBackground();
      this.initGameElements();
      this.startGameLoop();
    };
    this.backgroundimage.src = backgroundimageUrl;
  }

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
    let gameWidth = window.getComputedStyle(document.querySelector('#game'));
    this.canvas.width = parseFloat(gameWidth.width);
    this.canvas.height = this.canvas.width * 0.75;
    this.drawBackground(); // 캔버스 크기가 변경될 때마다 배경 다시 그리기
  }

  appendTo(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    element.appendChild(this.canvas);
  }

  removeFrom(element) {
    if (typeof element === 'string') {
      element = document.querySelector(element);
    }
    element.removeChild(this.canvas);
  }

  increaseScore() {
    this.score += 100; // 점수를 100 증가시킵니다.
  }

  decreaseLife() {
    if (this.lifes.length > 0) {
      this.lifes.pop(); // 생명 배열에서 하나를 제거합니다.
    }
  }
  // 곤용 increaseLife
  increaseLife() {
    console.log('생명+1');

    const newX = 10 + this.lifes.length * 40;

    const newLife = new Life(
      this.canvas,
      './source/full_heart.png',
      30,
      newX,
      10
    );

    this.lifes.push(newLife);
  }

  drawScore() {
    // <<<<<<< HEAD
    //     this.context.font = "24px Arial";
    //     this.context.fillStyle = "yellow";
    //     this.context.lineWidth = 2;
    //     this.context.fillText("Score: " + this.score, this.canvas.width - 150, 35);
    //   }
    // =======
    // 첫 번째 줄 스타일
    this.context.font = 'bold 22px Pixelify Sans';
    this.context.fillStyle = 'red';
    this.context.lineWidth = 2;
    this.context.fillText('SCORE', this.canvas.width - 100, 23);

    // 두 번째 줄 스타일
    this.context.font = '18px Verdana';
    this.context.fillStyle = 'white';
    this.context.lineWidth = 1;
    this.context.fillText(this.score, this.canvas.width - 95, 40);
  }

  destroy() {
    window.removeEventListener('resize', this.resizeCanvas.bind(this));
    this.balls = [];
    this.blocks = [];
    this.items = [];
    this.paddle = null;
    this.lifes = [];
  }

  initGameElements() {
    let speed = 2;
    if (selectTargetGame == 'game3') speed = 3;
    this.balls.push(
      new Ball(
        this.ballInitialX,
        this.ballInitialY,
        speed,
        -speed,
        10,
        '#0095DD'
      )
    );
    this.paddle = new Paddle(this.canvas, 100, 60, 10);
    this.paddle.bindMouseMove();

    for (let i = 0; i < 3; i++) {
      this.lifes.push(
        new Life(this.canvas, './source/full_heart.png', 30, 10 + i * 40, 10)
      );
    }
  }

  addBall(dx, dy, radius, color) {
    const newBall = new Ball(
      this.ballInitialX,
      this.ballInitialY,
      dx,
      dy,
      radius,
      color
    );
    this.balls.push(newBall);
  }

  increaseBrokenBlocks() {
    this.brokenBlocks++;
  }

  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기

      this.blocks.forEach((block) => {
        block.move();
        block.draw(this.context);
        if (block.isOutOfBounds(this.canvas.height - 100)) {
          block.visible = false;
          this.decreaseLife(); // 블록이 바닥에 닿으면 생명 감소
        }
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
        this.balls.forEach((ball) => this.paddle.collectItem(item, this.balls));
      });

      this.drawScore();
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
