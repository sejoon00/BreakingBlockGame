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
    this.isWarningVisible = false; // 경고 메시지 표시 여부
    this.boss; // 보스 블록
    this.originalBlockSpeed = 0.5; //원래 속도 저장
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
    //곤용 originalSpeed적용 두 줄 추가
    // 기존속도 ,변경 속도 콘솔창 undefined => 정상적으로 출력
    this.vanellope.blockSpeed = this.blockSpeed; 
    this.vanellope.originalBlockSpeed = this.blockSpeed;

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
      //곤용 originalSpeed적용 두 줄 추가
      // 기존속도 ,변경 속도 콘솔창 undefined => 정상적으로 출력
      villainBlock.blockSpeed = this.blockSpeed; 
      villainBlock.originalBlockSpeed = this.blockSpeed;
      this.villains.push(villainBlock);
      this.villainStates.set(villainBlock, {
        moveState: 0,
        currentDistance: 0,
      });
    }

    const bananaImageSrc = '../source/banana.png';
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
      setTimeout(() => {
        this.showWarning();
        this.boss = new Block(
          this.canvas.width - 150,
          this.canvas.height / 2 - 75,
          150,
          150,
          this.increaseBrokenBlocks.bind(this),
          '../game2/boss.png'
        );
      }, 2000);
    }, 5000);
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

  // 바넬로피가 먼저 도착
  endGame() {
    let game3Img = document.querySelector('#game3Img');
    if (this.vanellope.x + this.vanellope.width < 0) {
      console.log('GameClear');
      gameMode = 'GameClear';
      this.destroy();
      isGame2Cleared = true;
      toggleOverPage();
      game3Img.src = '../stagePage/HeroDuty2.png';
    } else if (
      this.villains.some(villain => villain.x + villain.width < 0) ||
      (this.boss && this.boss.x + this.boss.width < 0) ||
      this.balls.length === 0 ||
      this.lifes.length === 0
    ) {
      console.log('GameOver');
      gameMode = 'GameOver';
      this.destroy();
      toggleOverPage();
      game3Img.src = '../stagePage/HeroDuty.png';
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
        this.context.fillStyle = 'red';
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.restore();
        this.context.font = '48px Arial';
        this.context.fillStyle = 'red';
        this.context.textAlign = 'center';
        this.context.fillText(
          'Warning! 보스보다 먼저 도착하세요!',
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
        this.boss.x -= this.blockSpeed; // 보스는 오른쪽에서 왼쪽으로 이동
        this.boss.draw(this.context);
      }

      this.balls.forEach((ball) => {
        if (this.vanellope.isHit(ball, this.items)) {
          this.vanellope.visible = true;
          this.decreaseLife(); // 생명 하나 줄이기
        }

        this.villains.forEach((villain) => {
          if (villain.isHit(ball, this.items, this.increaseScore.bind(this))) {
            // this.decreaseLife(); // 생명 하나 줄이기
          }
        });

        // 보스와의 충돌 검사
        if (
          this.boss &&
          this.boss.isHit(ball, this.items, this.increaseScore.bind(this))
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
        this.balls.forEach((ball) => this.collectItem2(item, ball, this.balls));
      });

      // 바나나 그리기 및 충돌 처리
      this.bananas = this.bananas.filter((banana) => {
        banana.draw();
        let collisionDetected = false;

        this.balls.forEach((ball) => {
          if (banana.isColliding(ball)) {
            //console.log('충돌 발생'); // 충돌시 출력
            ball.changeDirectionRandomly();
          }
        });

        // 블록과 바나나 충돌 처리
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

        // 블록과의 충돌이 발생한 경우 배열에서 제거
        return !collisionDetected;
      });

      this.drawScore(); // 점수 그리기 추가
      requestAnimationFrame(update);
      this.endGame();
    };
    update();
  }

  //곤용 -item2로 바꿨더니 작동함
  collectItem2(item, ball) {
    if (item.isPaddleGetItem(this.paddle)) {
      console.log('아이템 수집: ' + item.type); // 디버그용 로그

      if (item.type == 'increasevanellopespeed') {
        this.increaseVanellopeSpeed();
      } else if (item.type == 'decreasevanellopespeed') {
        this.decreaseVanellopeSpeed();
      } else if (item.type == 'increaseheart') {
        this.increaseLife();
      } else if (item.type == 'decreaseheart') {
        this.decreaseLife();
      } else if (item.type == 'increasemonsterspeed') {
        this.increaseMonsterSpeed();
      } else if (item.type == 'decreasemonsterspeed') {
        this.decreaseMonsterSpeed();
      }
    }
  }

  // 바넬로피 속도 관련 함수
  increaseVanellopeSpeed() {
    console.log('바낼 속도 증가');
    console.log('기존 속도:', this.vanellope.blockSpeed); // 기존 속도 디버깅 메시지
    this.vanellope.blockSpeed = 10.7;
    console.log('변경된 속도:', this.vanellope.blockSpeed); // 변경된 속도 디버깅 메시지
    setTimeout(() => {
      this.vanellope.blockSpeed = this.vanellope.originalBlockSpeed;
      console.log('복원된 속도:', this.vanellope.blockSpeed); // 복원된 속도 디버깅 메시지
    }, 2000);
  }

  decreaseVanellopeSpeed() {
    console.log('바낼 속도 감소');
    console.log('기존 속도:', this.vanellope.blockSpeed); // 기존 속도 디버깅 메시지
    this.vanellope.blockSpeed = 0.4;
    console.log('변경된 속도:', this.vanellope.blockSpeed); // 변경된 속도 디버깅 메시지
    setTimeout(() => {
      this.vanellope.blockSpeed = this.vanellope.originalBlockSpeed;
      console.log('복원된 속도:', this.vanellope.blockSpeed); // 복원된 속도 디버깅 메시지
    }, 2000);
  }

  // 몬스터 속도 관련 함수
  increaseMonsterSpeed() {
    console.log('몬스터 속도 증가');
    this.villains.forEach((villain) => {
      console.log('기존 속도:', villain.blockSpeed); // 기존 속도 디버깅 메시지
      villain.blockSpeed = 0.7;
      console.log('변경된 속도:', villain.blockSpeed); // 변경된 속도 디버깅 메시지
    });
    setTimeout(() => {
      this.villains.forEach((villain) => {
        villain.blockSpeed = villain.originalBlockSpeed;
        console.log('복원된 속도:', villain.blockSpeed); // 복원된 속도 디버깅 메시지
      });
    }, 2000);
  }

  decreaseMonsterSpeed() {
    console.log('몬스터 속도 감소');
    this.villains.forEach((villain) => {
      console.log('기존 속도:', villain.blockSpeed); // 기존 속도 디버깅 메시지
      villain.blockSpeed = 0.4;
      console.log('변경된 속도:', villain.blockSpeed); // 변경된 속도 디버깅 메시지
    });
    setTimeout(() => {
      this.villains.forEach((villain) => {
        villain.blockSpeed = villain.originalBlockSpeed;
        console.log('복원된 속도:', villain.blockSpeed); // 복원된 속도 디버깅 메시지
      });
    }, 2000);
  }
}