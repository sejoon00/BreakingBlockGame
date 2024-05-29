class Game3_canvas extends Canvas {
  constructor(backgroundimageUrl) {
    super(backgroundimageUrl);
    this.canvas.id = "game3_canvas"; // canvas id 변경
    this.path = [
      { x: 50, y: 0 },
      { x: 50, y: 100 },
      { x: 300, y: 100 },
      { x: 300, y: 300 },
      { x: 700, y: 300 },
      { x: 700, y: 100 },
      { x: 900, y: 100 },
      { x: 900, y: 500 },
      { x: 50, y: 500 },
      { x: 50, y: window.innerHeight },
    ]; // 적 이동 경로
    this.tower = null; // 추가 필드
    this.boss = null;
    this.isWarningVisible = false; // 경고 메시지 표시 여부
    this.lastBallTime = Date.now(); // 마지막으로 공이 발사된 시간
    this.requiredHits = 1; // 초기 부서지기 위해 필요한 횟수
    this.blockImageSrc = "../source/Cy-Bug.png"; // 초기 블록 이미지
    this.lightTower = new LightTower(
      700,
      100,
      200,
      200,
      "../source/light_tower.png"
    );
    window.addEventListener("keydown", this.handleKeyPress.bind(this));
  }

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

  launchBall() {
    const ballX = this.paddle.x + this.paddle.width / 2;
    const ballY = this.paddle.y - 10; // 패들 위에서 발사
    const ballSpeed = 3;

    const directionX = Math.random() < 0.5 ? -1 : 1;
    const ball = new Ball(
      ballX,
      ballY,
      directionX * ballSpeed,
      -ballSpeed,
      10,
      "blue"
    ); // 공 객체 생성
    this.balls.push(ball);
  }

  initGameElements() {
    super.initGameElements();
    // 무한히 블록을 생성하여 경로를 따라 이동하게 설정
    setInterval(() => {
      const startX = this.path[0].x;
      const startY = this.path[0].y; // 블록이 겹치지 않도록 시작 위치를 조정
      this.blocks.push(
        new Block(
          startX,
          startY,
          40,
          40,
          this.increaseBrokenBlocks.bind(this),
          this.blockImageSrc,
          this.path,
          this.requiredHits // 생성 시 현재 requiredHits 값 사용
        )
      );
    }, 1000);

    // 15초마다 새로 생성되는 블록의 히트 카운트 증가 및 이미지 변경
    setInterval(() => {
      this.requiredHits++;
      if (this.requiredHits === 2) {
        this.blockImageSrc = "../source/Cy-Bug2.webp";
      } else if (this.requiredHits >= 3) {
        this.blockImageSrc = "../source/Cy-Bug3.webp";
      }
    }, 20000);

    console.log("Blocks will be added continuously in Game3_canvas");

    // 보스 몬스터 생성 (15초 후 등장)
    setTimeout(() => {
      setTimeout(() => {
        this.showWarning();
        this.boss = new Boss(
          this.canvas,
          this.canvas.width / 2 - 150,
          50,
          this.endGame.bind(this)
        ); // 보스 위치 조정
      }, 2000);
    }, 15000);
  }

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
    }, 1000); // 250ms 간격으로 깜빡임
  }

  handleKeyPress(event) {
    if (event.key === "p" || event.key === "P") {
      this.clearGame(); // 'P' 키를 누르면 게임 클리어
    }
  }

  clearGame() {
    gameMode = "GameClear";

    this.destroy();
    toggleOverPage();
    game3Img.src = "../stagePage/HeroDuty2.png";
  }

  endGame() {
    if (this.boss.hp == 0) {
      console.log("GameClear boss hp");
      gameMode = "GameClear";
      this.destroy();
      toggleOverPage();
      game3Img.src = "../stagePage/HeroDuty2.png";
    } else if (this.lifes.length === 0) {
      console.log("GameClear paddle hp");

      gameMode = "GameOver";
      this.destroy();
      toggleOverPage();
      game3Img.src = "../stagePage/HeroDuty.png";
    }
  }

  startGameLoop() {
    const update = () => {
      console.log("life:" + this.lifes.length);
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

      if (this.isWarningVisible) {
        // 하얀색 반투명 배경으로 깜빡이기
        this.context.save();
        this.context.globalAlpha = 0.4;
        this.context.fillStyle = "red";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
      } else {
        this.drawBackground(); // 배경 다시 그리기
      }

      this.drawPath(); // 경로 그리기 추가
      this.blocks.forEach((block) => {
        block.move(); // 블록 이동
        block.draw(this.context); // 블록 그리기
        if (block.isOutOfBounds(this.canvas.height)) {
          block.visible = false;
          console.log("블럭이 바닥에 닿음");

          this.decreaseLife(); // 블록이 바닥에 닿으면 생명 감소
        }
      });

      // 공 발사 로직 추가
      const currentTime = Date.now();
      if (currentTime - this.lastBallTime > 3000) {
        // 3초마다 발사
        this.launchBall();
        this.lastBallTime = currentTime;
      }

      this.balls = this.balls.filter((ball) => {
        ball.update(
          this.canvas,
          this.blocks,
          this.paddle,
          this.items,
          this.increaseScore.bind(this),
          this.decreaseLife.bind(this),
          this.boss // 보스를 추가하여 공이 보스와 충돌할 때를 처리
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
        this.balls.forEach((ball) => {
          if (
            this.paddle.collectItem(item, this.balls) &&
            item.type === "light"
          ) {
            this.lightTower.checkAndDestroyBlocks(this.blocks);
            this.lightTower.drawDestroyingRange(this.context); // LightTower 파괴 범위 그리기 추가
          }
        });
      });

      this.lightTower.drawDestroyingRange(this.context); // 항상 호출하여 파괴 범위가 올바르게 표시되도록 함
      this.lightTower.draw(this.context); // LightTower 그리기 추가

      this.lightTower.draw(this.context); // LightTower 그리기 추가

      // 보스 몬스터 업데이트 및 그리기
      if (this.boss) {
        this.boss.update();
        this.boss.draw();

        // 보스 몬스터의 총알과 막대기의 충돌 검사
        this.boss.bullets.forEach((bullet) => {
          bullet.draw(); // 총알을 그리도록 추가
          if (this.paddle.isCollidingWithBullet(bullet)) {
            console.log("보스 총알에 맞음");

            this.decreaseLife();
            bullet.isRemoved = true;
          }
        });
      }

      // 보스 몬스터가 일정 시간마다 총알 발사
      if (this.boss && !this.boss.isRemoved) {
        if (Date.now() % 1000 < 10) {
          this.boss.shoot();
        }
      }

      // 경고 메시지 표시
      if (this.isWarningVisible) {
        this.context.font = "48px Arial";
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText(
          "Warning! 보스를 해치우세요",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
      }

      this.drawScore();
      requestAnimationFrame(update);
      this.endGame();
    };
    update();
  }
}
