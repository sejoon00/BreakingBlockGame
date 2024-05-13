class Block {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
  }

  hitLeft(ball) {
    if (ball.dx > 0) {
      ball.dx = -ball.dx;
    }
  }

  hitRight(ball) {
    if (ball.dx < 0) {
      ball.dx = -ball.dx;
    }
  }

  hitTop(ball) {
    if (ball.dy > 0) {
      ball.dy = -ball.dy;
    }
  }

  hitBottom(ball) {
    if (ball.dy < 0) {
      ball.dy = -ball.dy;
    }
  }

  isHit(ball) {
    if (!this.visible) return false;

    // 간단한 AABB 충돌 검사
    if (ball.x + ball.radius > this.x && ball.x - ball.radius < this.x + this.width &&
        ball.y + ball.radius > this.y && ball.y - ball.radius < this.y + this.height) {
      this.visible = false; // 블럭을 보이지 않게 설정

      // 부딪힌 면 확인
      const collideLeft = ball.x + ball.radius > this.x && ball.x < this.x;
      const collideRight = ball.x - ball.radius < this.x + this.width && ball.x > this.x + this.width;
      const collideTop = ball.y + ball.radius > this.y && ball.y < this.y;
      const collideBottom = ball.y - ball.radius < this.y + this.height && ball.y > this.y + this.height;

      // 충돌 방향 계산 및 반응
      if (collideLeft && ball.dx > 0) {
        this.hitLeft(ball);
      } else if (collideRight && ball.dx < 0) {
        this.hitRight(ball);
      }
      
      if (collideTop && ball.dy > 0) {
        this.hitTop(ball);
      } else if (collideBottom && ball.dy < 0) {
        this.hitBottom(ball);
      }
      
      return true;
    }
    return false;
  }

  draw(ctx) {
      if (this.visible) {
        ctx.fillStyle = '#FF5733'; // 블록 색상 설정
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  }
}
