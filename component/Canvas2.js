class Canvas2 {
  constructor(backgroundimageUrl) {
    this.backgroundimageUrl = backgroundimageUrl;
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'game2_canvas';
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
    this.vanellope;
    this.blockSpeed = 0.7; // 블록의 이동 속도
    this.moveState = 0; // 이동 상태 (0: 아래로, 1: 왼쪽으로, 2: 위로, 3: 왼쪽으로)
    this.maxDistance = 200; // 한 번에 이동할 최대 거리
    this.currentDistance = 0; // 현재 이동 거리

    window.addEventListener('resize', this.resizeCanvas.bind(this));
    this.backgroundimage.onload = () => {
      this.resizeCanvas(); // 초기 크기 조정
      this.ballInitialX = this.canvas.width / 2;
      this.ballInitialY = this.canvas.height - 100;
      this.drawBackground();
      this.initGameElements();
      this.startGameLoop();

      console.log(this.ballInitialX);
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
    let gameWidth = window.getComputedStyle(document.querySelector('#game2'));

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
    console.log('score');
  }

  decreaseLife() {
    console.log('생명-1');
    if (this.lifes.length > 0) {
      this.lifes.pop(); // 생명 배열에서 하나를 제거합니다.
    }
  }

  drawScore() {
    this.context.font = '24px Arial';
    this.context.fillStyle = 'yellow';
    this.context.lineWidth = 2;
    this.context.fillText('Score: ' + this.score, this.canvas.width - 150, 35);
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
    this.balls.push(
      new Ball(this.ballInitialX, this.ballInitialY, 1, -1, 10, '#0095DD')
    );
    this.paddle = new Paddle(this.canvas, 100, 10, 10);
    this.paddle.bindMouseMove();

    let startY = 116;
    let startX = 900; // 블록의 시작 x 위치
    this.vanellope = new Block(
      startX,
      startY,
      60,
      40,
      this.increaseBrokenBlocks.bind(this),
      '../game2/vanellope.png'
    );
    this.vanellope.isVanellope = true;

    for (let i = 0; i < 3; i++) {
      this.lifes.push(
        new Life(this.canvas, '../source/full_heart.png', 30, 10 + i * 40, 10)
      );
    }
  }

  addBall(dx, dy, radius, color) {
    const newBall = new Ball(x, y, dx, dy, radius, color);
    this.balls.push(newBall);
  }

  increaseBrokenBlocks() {
    this.brokenBlocks++;
    if (this.brokenBlocks === this.blocks.length) {
      this.endGame(); // 모든 블록이 부서졌을 때 게임 종료
    }
  }

  startGameLoop() {
    const update = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기

      // 블록 이동 로직 추가
      if (this.moveState === 0) {
        this.vanellope.y += this.blockSpeed; // 아래로 이동
      } else if (this.moveState === 1) {
        this.vanellope.x -= this.blockSpeed; // 왼쪽으로 이동
      } else if (this.moveState === 2) {
        this.vanellope.y -= this.blockSpeed; // 위로 이동
      } else if (this.moveState === 3) {
        this.vanellope.x -= this.blockSpeed; // 왼쪽으로 이동
      }

      this.currentDistance += this.blockSpeed;

      if (this.currentDistance >= this.maxDistance) {
        this.moveState = (this.moveState + 1) % 4; // 이동 상태 변경
        this.currentDistance = 0; // 이동 거리 초기화
      }

      this.vanellope.draw(this.context);

      // 공과 vanellope 블록의 충돌 검사
      this.balls.forEach((ball) => {
        if (
          this.vanellope.isHit(ball, this.items, this.increaseScore.bind(this))
        ) {
          this.vanellope.visible = true;
          this.decreaseLife(); // 생명 하나 줄이기
        }
      });

      if (this.vanellope.x + this.vanellope.width < 0) {
        alert('게임 승리');
      }

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

      this.paddle.draw(); // 막대기 그리기 추가

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
}
