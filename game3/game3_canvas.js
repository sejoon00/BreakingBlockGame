class Game3_canvas extends Canvas {
  constructor(backgroundimageUrl) {
    super(backgroundimageUrl);
    this.canvas.id = "game3_canvas"; // canvas id 변경
    this.path = [
      { x: 50, y: 100 },
      { x: 300, y: 100 },
      { x: 300, y: 300 },
      { x: 550, y: 300 },
      { x: 550, y: 500 },
      { x: 750, y: 500 },
    ]; // 적 이동 경로
    this.tower = null; // 추가 필드
    this.boss = null;
    this.isWarningVisible = false; // 경고 메시지 표시 여부
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

    let block3num = 20;
    for (let i = 0; i < block3num; i++) {
      this.blocks.push(
        new Block3(50, 50, 40, 40, 1, this.increaseBrokenBlocks.bind(this), "red")
      );
      //console.log("New block added in Game3_canvas");
    }

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
    }, 1000);
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
    }, 1000); // 250ms 간격으로 깜빡임
  }

  // 게임 종료 메서드
  endGame() {
    alert("Congratulations! You've destroyed the boss!");
    this.destroy();
    gameState = "GameClear";
    $('#overPage').fadeOut('slow').slideDown('slow');
  }

  // 사용자 hp 0인지 확인하는 함수 
  checkBallandLife() {
    if (this.lifes.length === 0) {
      gameState = "GameOver";
      this.destroy();
      $('#overPage').fadeOut('slow').slideDown('slow');
    }
  }

  // 게임 루프 내에서 drawPath를 호출하여 경로를 그림
  startGameLoop() {
    const update = () => {
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
        block.move(); // 블록 이동시키기
        block.draw(this.context); // 블록 그리기
      });

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
        ball.update(
          this.canvas,
          this.blocks,
          this.paddle,
          this.items,
          this.increaseScore.bind(this),
          this.decreaseLife.bind(this),
          this.boss // 보스를 추가하여 공이 보스와 충돌할 때를 처리
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

      // 보스 몬스터 업데이트 및 그리기
      if (this.boss) {
        this.boss.update();
        this.boss.draw();

        // 보스 몬스터의 총알과 막대기의 충돌 검사
        this.boss.bullets.forEach((bullet) => {
          bullet.draw(); // 총알을 그리도록 추가
          if (this.paddle.isCollidingWithBullet(bullet)) {
            this.decreaseLife();
            bullet.isRemoved = true;
          }
        });
      }

      // 보스 몬스터가 일정 시간마다 총알 발사
      if (this.boss && !this.boss.isRemoved) {
        if (Date.now() % 1000 < 16) {
          this.boss.shoot();
        }
      }

      // 경고 메시지 표시
      if (this.isWarningVisible) {
        this.context.font = "48px Arial";
        this.context.fillStyle = "red";
        this.context.textAlign = "center";
        this.context.fillText(
          "Warning! 보스를 헤치우세요",
          this.canvas.width / 2,
          this.canvas.height / 2
        );
      }

      this.drawScore();
      requestAnimationFrame(update);
    };
    update();
  }
}
