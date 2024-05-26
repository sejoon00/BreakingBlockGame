// Canvas2 클래스가 Canvas 클래스를 상속하도록 수정
class Canvas2 extends Canvas {
  constructor(backgroundimageUrl) {
    super(backgroundimageUrl);
    this.canvas.id = 'game2_canvas';
    this.vanellope;
    this.villains = []; // 빌런 리스트 초기화
    this.blockSpeed = 0.5; // 블록의 이동 속도
    this.moveState = 0; // 이동 상태 (0: 아래로, 1: 왼쪽으로, 2: 위로, 3: 왼쪽으로)
    this.maxDistance = 400; // 한 번에 이동할 최대 거리
    this.currentDistance = 0; // 현재 이동 거리
    this.bananas = []; // 바나나 초기화
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
    }

    // 곤용 바나나 배치 노란 부분에만 나타나도록 수정
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
  }

  startGameLoop() {
    const update = () => {
      if (this.isPaused) return; // 게임이 일시 중지된 경우 업데이트 중지
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
      // 빌런 블록들 이동 및 그리기
      this.villains.forEach((villain) => {
        if (this.moveState === 0) {
          villain.y += this.blockSpeed; // 아래로 이동
        } else if (this.moveState === 1) {
          villain.x -= this.blockSpeed; // 왼쪽으로 이동
        } else if (this.moveState === 2) {
          villain.y -= this.blockSpeed; // 위로 이동
        } else if (this.moveState === 3) {
          villain.x -= this.blockSpeed; // 왼쪽으로 이동
        }

        this.currentDistance += this.blockSpeed;

        if (this.currentDistance >= this.maxDistance) {
          this.moveState = (this.moveState + 1) % 4; // 이동 상태 변경
          this.currentDistance = 0; // 이동 거리 초기화
        }
        villain.draw(this.context);
      });

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

      // 곤용 바나나 그리기
      this.bananas.forEach((banana) => {
        banana.draw();
        this.balls.forEach((ball) => {
          if (banana.isColliding(ball)) {
            console.log('충돌 발생'); // 충돌시 출력
            ball.changeDirectionRandomly();
          }
        });
      });

      this.drawScore(); // 점수 그리기 추가
      requestAnimationFrame(update);
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

  //바넬로피 속도 관련 함수
  increaseVanellopeSpeed() {
    console.log('바낼 속도 증가');
    this.vanellope.blockSpeed = 0.7;
    setTimeout(() => {
      this.vanellope.blockSpeed = this.originalBlockSpeed;
    }, 2000);
  }

  decreaseVanellopeSpeed() {
    console.log('바낼 속도 감소');
    this.vanellope.blockSpeed = 0.4;
    setTimeout(() => {
      this.vanellope.blockSpeed = this.originalBlockSpeed;
    }, 2000);
  }

  // 몬스터 속도 관련 함수
  increaseMonsterSpeed() {
    console.log('몬스터 속도 증가');
    this.villains.forEach((villain) => (villain.blockSpeed = 0.7));
    setTimeout(() => {
      this.villains.forEach(
        (villain) => (villain.blockSpeed = this.originalBlockSpeed)
      );
    }, 2000);
  }

  decreaseMonsterSpeed() {
    console.log('몬스터 속도 감소');
    this.villains.forEach((villain) => (villain.blockSpeed = 0.4));
    setTimeout(() => {
      this.villains.forEach(
        (villain) => (villain.blockSpeed = this.originalBlockSpeed)
      );
    }, 2000);
  }
}
