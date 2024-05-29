class Canvas2 extends Canvas {
  constructor(backgroundimageUrl) {
    super(backgroundimageUrl);
    this.canvas.id = "game2_canvas";
    this.vanellope;
    this.villains = []; // 빌런 리스트 초기화
    this.blockSpeed = 0.5; // 블록의 이동 속도
    this.moveState = 0; // 이동 상태 (0: 오른쪽 아래 대각선, 1: 왼쪽 아래 대각선, 2: 오른쪽 위 대각선, 3: 왼쪽 위 대각선)
    this.maxDistance = 100; // 한 번에 이동할 최대 거리
    this.currentDistance = 0; // 현재 이동 거리
    this.bananas = []; // 바나나 초기화
    this.frozenBlocks = new Set(); // 일시정지된 블록들
    this.isWarningVisible = false; // 경고 메시지 표시 여부
    this.boss; // 보스 블록
    this.originalBlockSpeed = 0.5; // 원래 속도 저장
    this.villainStates = new Map(); // 빌런의 상태 저장
    this.vanellopeState = {
      moveState: 0,
      currentDistance: 0,
    }; // 바넬로피의 상태 저장
    window.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

  initGameElements() {
    super.initGameElements(); // 부모 클래스의 initGameElements 호출
    this.increaseLife();
    this.increaseLife();
    let startY = 80;
    let startX = 900; // 블록의 시작 x 위치
    this.vanellope = new Block(
      startX + 40,
      startY + 150,
      100,
      80,
      this.increaseBrokenBlocks.bind(this),
      "../game2/vanellope.png"
    );
    this.vanellope.isVanellope = true;
    this.vanellope.blockSpeed = 0.7;
    this.vanellope.originalBlockSpeed = this.blockSpeed;

    for (let i = 0; i < 6; i++) {
      let villainBlock = new Block(
        startX,
        startY + i * 70,
        80,
        60,
        this.increaseBrokenBlocks.bind(this),
        "../game2/villain" + i + ".png",
        false // 일반 블록임을 나타내는 플래그
      );
      villainBlock.blockSpeed = this.blockSpeed;
      villainBlock.originalBlockSpeed = this.blockSpeed;
      this.villains.push(villainBlock);
      this.villainStates.set(villainBlock, {
        moveState: 0,
        currentDistance: 0,
      });
    }

    const bananaImageSrc = "../source/banana.png";
    const bananaSize = 50;
    const yellowAreaTop = 100;
    const yellowAreaBottom = this.canvas.height - 150;
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * (this.canvas.width - bananaSize);
      const y =
        yellowAreaTop +
        Math.random() * (yellowAreaBottom - yellowAreaTop - bananaSize);
      this.bananas.push(
        new Banana(this.canvas, bananaImageSrc, bananaSize, x, y)
      );
    }

    // 보스 블록 초기화
    setTimeout(() => {
      this.showWarning();
      setTimeout(() => {
        this.boss = new Block(
          this.canvas.width - 150,
          this.canvas.height / 2 - 75,
          150,
          150,
          this.increaseBrokenBlocks.bind(this),
          "../game2/boss.png"
        );
        this.boss.blockSpeed = this.blockSpeed;
        this.boss.originalBlockSpeed = this.blockSpeed;
      }, 2000);
    }, 5000);
  }

  setBlockSpeed(block, newSpeed, duration) {
    console.log(`변경 전 속도: ${block.blockSpeed}`);
    block.blockSpeed = newSpeed;
    console.log(`변경된 속도: ${block.blockSpeed}`);
    setTimeout(() => {
      block.blockSpeed = block.originalBlockSpeed;
      console.log(`복원된 속도: ${block.blockSpeed}`);
    }, duration);
  }

  increaseVanellopeSpeed() {
    this.setBlockSpeed(this.vanellope, 1.5, 2000);
  }

  decreaseVanellopeSpeed() {
    this.setBlockSpeed(this.vanellope, 0.1, 2000);
  }

  increaseMonsterSpeed() {
    this.villains.forEach((villain) => this.setBlockSpeed(villain, 1.5, 2000));
  }

  decreaseMonsterSpeed() {
    this.villains.forEach((villain) => this.setBlockSpeed(villain, 0.1, 2000));
  }

  freezeBlock(block) {
    this.frozenBlocks.add(block);
    setTimeout(() => {
      this.frozenBlocks.delete(block);
    }, 1000); // 1초 동안 멈춤
  }

  moveBlock(block, state) {
    if (!this.frozenBlocks.has(block)) {
      switch (state.moveState) {
        case 0:
          block.y += block.blockSpeed;
          break;
        case 1:
          block.x -= block.blockSpeed;
          break;
        case 2:
          block.y -= block.blockSpeed;
          break;
        case 3:
          block.x -= block.blockSpeed;
          break;
      }

      state.currentDistance += block.blockSpeed;

      if (state.currentDistance >= this.maxDistance) {
        state.moveState = (state.moveState + 1) % 4;
        state.currentDistance = 0;
      }
    }
  }

  // 경고 메시지를 표시하는 메서드
  showWarning() {
    this.isWarningVisible = true;
    let blinkCount = 0;
    const blinkInterval = setInterval(() => {
      this.isWarningVisible = !this.isWarningVisible;
      blinkCount++;
      if (blinkCount === 4) {
        clearInterval(blinkInterval);
        this.isWarningVisible = false;
      }
    }, 1000); // 1초 간격으로 깜빡임
  }

  handleKeyPress(event) {
    if (event.key === "p" || event.key === "P") {
      this.clearGame(); // 'P' 키를 누르면 게임 클리어
    }
  }

  clearGame() {
    gameMode = "GameClear";

    this.destroy();
    isGame2Cleared = true;
    toggleOverPage();
    game3Img.src = "../stagePage/HeroDuty2.png";
  }

  // 바넬로피가 먼저 도착
  endGame() {
    let game3Img = document.querySelector("#game3Img");

    if (this.vanellope.x + this.vanellope.width < 0) {
      console.log("GameClear");
      gameMode = "GameClear";
      this.destroy();
      isGame2Cleared = true;
      toggleOverPage();
      game3Img.src = "../stagePage/HeroDuty2.png";
    } else if (
      this.villains.some((villain) => villain.x + villain.width < 0) ||
      (this.boss && this.boss.x + this.boss.width < 0) ||
      this.balls.length === 0 ||
      this.lifes.length === 0
    ) {
      console.log("GameOver");
      gameMode = "GameOver";
      this.destroy();
      toggleOverPage();
      game3Img.src = "../stagePage/HeroDuty.png";
    }
  }

  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기

      if (this.isWarningVisible) {
        // 하얀색 반투명 배경으로 깜빡이기
        this.context.save();
        this.context.globalAlpha = 0.1;
        this.context.fillStyle = "red";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
        this.context.font = "48px Arial";
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText(
          "Warning! 보스보다 먼저 도착하세요!",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
      } else {
        this.drawBackground(); // 배경 다시 그리기
      }

      this.moveBlock(this.vanellope, this.vanellopeState);
      this.vanellope.draw(this.context);

      this.villains.forEach((villain) => {
        this.moveBlock(villain, this.villainStates.get(villain));
        villain.draw(this.context);
      });

      // 보스 이동 로직
      if (this.boss) {
        this.boss.x -= this.boss.blockSpeed; // 보스는 오른쪽에서 왼쪽으로 이동
        this.boss.draw(this.context);
      }

      this.balls.forEach((ball) => {
        if (
          this.vanellope.isHit(
            ball,
            this.items,
            this.increaseScore.bind(this),
            this.blocks
          )
        ) {
          this.vanellope.visible = true;
          this.decreaseLife(); // 생명 하나 줄이기
        }

        this.villains.forEach((villain) => {
          if (
            villain.isHit(
              ball,
              this.items,
              this.increaseScore.bind(this),
              this.villains
            )
          ) {
            // this.decreaseLife(); // 생명 하나 줄이기
          }
        });

        // 보스와의 충돌 검사
        if (
          this.boss &&
          this.boss.isHit(
            ball,
            this.items,
            this.increaseScore.bind(this),
            this.villains
          )
        ) {
          this.boss = null; // 보스 제거
        }
      });

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
        this.balls.forEach((ball) => this.collectItem2(item, ball));
      });

      // 바나나 그리기
      this.bananas = this.bananas.filter((banana) => {
        banana.draw();
        let collisionDetected = false;
        // 바나나 공 경로 변경 없앰
        this.balls.forEach((ball) => {
          if (banana.isColliding(ball)) {
          }
        });

        if (
          this.vanellope.visible == true &&
          banana.isCollidingWithBlock(this.vanellope)
        ) {
          this.freezeBlock(this.vanellope);
          collisionDetected = true;
        }

        this.villains.forEach((villain) => {
          if (villain.visible == true && banana.isCollidingWithBlock(villain)) {
            this.freezeBlock(villain);
            collisionDetected = true;
          }
        });

        return !collisionDetected;
      });

      this.drawScore(); // 점수 그리기 추가
      requestAnimationFrame(update);
      this.endGame();
    };
    update();
  }

  collectItem2(item, ball) {
    if (item.isPaddleGetItem(this.paddle)) {
      console.log("아이템 수집: " + item.type); // 디버그용 로그

      if (item.type === "increasevanellopespeed") {
        this.increaseVanellopeSpeed();
      } else if (item.type === "decreasevanellopespeed") {
        this.decreaseVanellopeSpeed();
      } else if (item.type === "increaseheart") {
        this.increaseLife();
      } else if (item.type === "decreaseheart") {
        this.decreaseLife();
      } else if (item.type === "increasemonsterspeed") {
        this.increaseMonsterSpeed();
      } else if (item.type === "decreasemonsterspeed") {
        this.decreaseMonsterSpeed();
      }
    }
  }
}
