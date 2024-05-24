class Canvas2 extends Canvas {
  constructor(backgroundimageUrl) {
    super(backgroundimageUrl);
    this.canvas.id = 'game2_canvas';
    this.vanellope;
    this.villains = []; // 빌런 리스트 초기화
    this.blockSpeed = 0.5; // 블록의 이동 속도
    this.vanellopeState = { moveState: 0, currentDistance: 0 }; // 바닐로페 이동 상태 및 거리
    this.villainStates = new Map(); // 빌런 이동 상태 및 거리
    this.maxDistance = 100; // 한 번에 이동할 최대 거리
    this.bananas = []; // 바나나 초기화
    this.frozenBlocks = new Set(); // 일시정지된 블록들
  }

  initGameElements() {
    super.initGameElements(); // 부모 클래스의 initGameElements 호출
    let startY = 116;
    let startX = 900; // 블록의 시작 x 위치
    this.vanellope = new Block(
      startX + 40,
      startY + 150,
      100,
      80,
      this.increaseBrokenBlocks.bind(this),
      '../game2/vanellope.png'
    );
    this.vanellope.isVanellope = true;

    for (let i = 0; i < 6; i++) {
      let villainBlock = new Block(
        startX,
        startY + i * 70,
        80,
        60,
        this.increaseBrokenBlocks.bind(this),
        '../game2/villain' + i + '.png',
        false // 일반 블록임을 나타내는 플래그
      );
      this.villains.push(villainBlock);
      this.villainStates.set(villainBlock, {
        moveState: 0,
        currentDistance: 0,
      });
    }

    const bananaImageSrc = '../source/banana.png';
    const bananaSize = 50;
    const yellowAreaTop = 100;
    const yellowAreaBottom = this.canvas.height - 100;
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * (this.canvas.width - bananaSize);
      const y =
        yellowAreaTop +
        Math.random() * (yellowAreaBottom - yellowAreaTop - bananaSize);
      this.bananas.push(
        new Banana(this.canvas, bananaImageSrc, bananaSize, x, y)
      );
    }
  }

  freezeBlock(block) {
    this.frozenBlocks.add(block);
    setTimeout(() => {
      this.frozenBlocks.delete(block);
    }, 1000); // 1초 동안 멈춤
  }

  moveBlock(block, state) {
    if (!this.frozenBlocks.has(block)) {
      if (state.moveState === 0) {
        block.y += this.blockSpeed; // 아래로 이동
      } else if (state.moveState === 1) {
        block.x -= this.blockSpeed; // 왼쪽으로 이동
      } else if (state.moveState === 2) {
        block.y -= this.blockSpeed; // 위로 이동
      } else if (state.moveState === 3) {
        block.x -= this.blockSpeed; // 왼쪽으로 이동
      }

      state.currentDistance += this.blockSpeed;

      if (state.currentDistance >= this.maxDistance) {
        state.moveState = (state.moveState + 1) % 4; // 이동 상태 변경
        state.currentDistance = 0; // 이동 거리 초기화
      }
    }
  }

  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기

      this.moveBlock(this.vanellope, this.vanellopeState);
      this.vanellope.draw(this.context);

      this.villains.forEach((villain) => {
        this.moveBlock(villain, this.villainStates.get(villain));
        villain.draw(this.context);
      });

      this.balls.forEach((ball) => {
        if (
          this.vanellope.isHit(ball, this.items, this.increaseScore.bind(this))
        ) {
          this.vanellope.visible = true;
          this.decreaseLife(); // 생명 하나 줄이기
        }

        this.villains.forEach((villain) => {
          if (villain.isHit(ball, this.items, this.increaseScore.bind(this))) {
            this.decreaseLife(); // 생명 하나 줄이기
          }
        });
      });

      if (this.vanellope.x + this.vanellope.width < 0) {
        alert('게임 승리');
      }

      this.balls = this.balls.filter((ball) => {
        ball.update(
          this.canvas,
          this.villains,
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
          this.villains,
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

      // 바나나 그리기 및 충돌 처리
      this.bananas.forEach((banana) => {
        banana.draw();
        this.balls.forEach((ball) => {
          if (banana.isColliding(ball)) {
            console.log('충돌 발생'); // 충돌시 출력
            ball.changeDirectionRandomly();
          }
        });

        // 블록과 바나나 충돌 처리
        if (banana.isCollidingWithBlock(this.vanellope)) {
          this.freezeBlock(this.vanellope);
        }

        this.villains.forEach((villain) => {
          if (banana.isCollidingWithBlock(villain)) {
            this.freezeBlock(villain);
          }
        });
      });

      this.drawScore(); // 점수 그리기 추가
      requestAnimationFrame(update);
    };
    update();
  }
}
