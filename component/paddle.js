class Paddle {
  constructor(canvas, width, height, speed) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;
    this.x = (this.canvas.width - this.width) / 2; // 막대기의 초기 X 위치
    this.y = this.canvas.height - this.height - 30; // 막대기의 Y 위치
    this.speed = speed;
    //곤용
    this.image = new Image();
  }

  // 막대기 그리기 함수
  //draw() -> draw(selectCharacter)
  draw() {
    const ctx = this.canvas.getContext("2d");
    //곤용

    if (selectCharacter === "Ralph") {
      console.log("ralph");
      this.image.src = "../source/ralph_paddle.png";
    } else {
      this.image.src = "../source/vanellope_paddle.png";
    }

    ctx.beginPath();
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // 수정해야함
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
      ball.dy = -Math.cos(bounceAngle); // y 방향으로의 속도를 각도에 따라 조정합니다.
      return true; // 충돌이 발생했음을 반환합니다.
    }
    return false; // 충돌이 발생하지 않았음을 반환합니다.
  }

  // 아이템 수집 함수
  collectItem(item, ball, balls) {
    if (item.isPaddleGetItem(this)) {
      if (item.type === "speed") {
        // 속도 증가 아이템 효과
        if (ball.dx < 20 && ball.dy < 20) {
          ball.dx *= 1.5;
          ball.dy *= 1.5;
        }
      } else if (item.type === "ball") {
        // 공 개수 증가 아이템 효과
        let ballY;
        if (ball.dy > 0) ballY = -ball.dy;
        balls.push(
          new Ball(ball.x, ball.y, -ball.dx, ballY, ball.radius, ball.color)
        );
      }
    }
  }
}
