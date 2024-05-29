class Paddle {
  constructor(canvas, width, height, speed) {
    this.canvas = canvas;
    this.width = 110;
    this.height = 130;
    this.x = (this.canvas.width - this.width) / 2; // 막대기의 초기 X 위치
    this.y = this.canvas.height - this.height - 20; // 막대기의 Y 위치
    this.speed = speed;
    //곤용
    this.image = new Image();
    this.hitPointSize = 15;
  }

  // 막대기 그리기 함수
  //draw() -> draw(selectCharacter)
  draw() {
    const ctx = this.canvas.getContext("2d");
    //곤용

    if (selectCharacter === "Ralph") {
      this.image.src = "../source/ralph_paddle.png";
      if (selectTargetGame == "game3")
        this.image.src = "../source/stage3_ralph.png";
    } else {
      this.image.src = "../source/vanellope_paddle.png";
    }

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = "rgba(0, 0, 0, 0)"; // 수정 완
    ctx.fill();
    ctx.closePath();

    //곤용

    if (this.image.complete) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    } else {
      this.image.onload = () => {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      };
    }

    // if (selectTargetGame == 'game3') {
    //   ctx.fillStyle = 'green';
    //   ctx.fillRect(
    //     this.x + this.width / 2 - this.hitPointSize / 2,
    //     this.y + this.height / 2 - this.hitPointSize / 2,
    //     this.hitPointSize,
    //     this.hitPointSize
    //   );
    // }
  }
  // 이벤트 리스너 등록 (마우스 이동)
  bindMouseMove() {
    document.addEventListener("mousemove", (e) => {
      const relativeX = e.clientX - this.canvas.offsetLeft;
      if (relativeX > 0 && relativeX < this.canvas.width) {
        this.x = relativeX - this.width / 2;
      }
    });
  }

  // 막대기 이동 함수
  movePaddle(direction) {
    if (direction === "left" && this.x > 0) {
      this.x -= this.speed;
    } else if (
      direction === "right" &&
      this.x < this.canvas.width - this.width
    ) {
      this.x += this.speed;
    }
  }

  isCollidingWithBullet(bullet) {
    const hitPointX = this.x + this.width / 2 - this.hitPointSize / 2;
    const hitPointY = this.y + this.height / 2 - this.hitPointSize / 2;

    if (
      bullet.x > hitPointX &&
      bullet.x < hitPointX + this.hitPointSize &&
      bullet.y > hitPointY &&
      bullet.y < hitPointY + this.hitPointSize
    ) {
      return true;
    }
    return false;
  }

  //Block에서 가져와서 재사용
  // isHitPaddle(ball) {
  //   // 패들의 AABB 충돌 검사
  //   if (
  //     ball.x + ball.radius > this.x &&
  //     ball.x - ball.radius < this.x + this.width &&
  //     ball.y + ball.radius > this.y &&
  //     ball.y - ball.radius < this.y + this.height
  //   ) {
  //     // 충돌한 부분의 x좌표를 계산하여 충돌 위치에 따라 공의 반사 각을 조정합니다.
  //     const collisionPointX = ball.x - (this.x + this.width / 2);
  //     ball.dx = collisionPointX * 0.1; // 이 수치는 반사 각의 정도를 조절합니다.
  //     ball.dy = -ball.dy; // 공을 위쪽으로 튕깁니다.
  //     return true; // 충돌이 발생했음을 반환합니다.
  //   }
  //   return false; // 충돌이 발생하지 않았음을 반환합니다.
  // }

  isHitPaddle(ball) {
    // 패들의 AABB 충돌 검사
    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      // 충돌한 부분의 x좌표를 계산하여 충돌 위치에 따라 공의 반사 각을 조정합니다.
      const collisionPointX = ball.x - (this.x + this.width / 2);
      const normalizedCollisionPointX = collisionPointX / (this.width / 2);
      const maxBounceAngle = Math.PI / 3; // 최대 반사 각을 지정합니다. (60도)
      const bounceAngle = normalizedCollisionPointX * maxBounceAngle;
      ball.dx = Math.sin(bounceAngle); // x 방향으로의 속도를 각도에 따라 조정합니다.
      // ball.dy = -Math.cos(bounceAngle); // y 방향으로의 속도를 각도에 따라 조정합니다.
      ball.dy = -ball.dy;
      return true; // 충돌이 발생했음을 반환합니다.
    }
    return false; // 충돌이 발생하지 않았음을 반환합니다.
  }

  // 아이템 수집 함수
  collectItem(item, balls) {
    if (item.isPaddleGetItem(this)) {
      console.log("아이템 수집: " + item.type);

      if (item.type === "speed") {
        // 속도 증가 아이템 효과
        balls.forEach((b) => {
          if (b.dx < 20 && b.dy < 20) {
            b.dx *= 1.5;
            b.dy *= 1.5;
          }
        });
      } else if (item.type === "increaseball") {
        // 공 개수 증가 아이템 효과
        const ballX = this.x + this.width / 2;
        const ballY = this.y - 10; // 패들 위에서 발사
        let ballSpeed = 2;

        if (selectTargetGame == "game3") ballSpeed = 7;
        const directionX = Math.random() < 0.5 ? -1 : 1;
        balls.push(
          new Ball(ballX, ballY, directionX * ballSpeed, ballSpeed, 10)
        );
      }
      return true;
    }
  }
}
