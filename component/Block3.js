class Block3 {
  constructor(x, y, width, height, increaseBrokenBlocks) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
    this.increaseBrokenBlocks = increaseBrokenBlocks; // 부서진 블록 수 증가 콜백
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

  isHit(ball, items, increaseScore) {  
    if (!this.visible) return false;

    // 간단한 AABB 충돌 검사
    if (
      ball.x + ball.radius > this.x &&
      ball.x - ball.radius < this.x + this.width &&
      ball.y + ball.radius > this.y &&
      ball.y - ball.radius < this.y + this.height
    ) {
      this.visible = false; // 블럭을 보이지 않게 설정

      // 충돌 방향 계산 및 반응
      const overlapX =
        ball.radius +
        this.width / 2 -
        Math.abs(ball.x - (this.x + this.width / 2));
      const overlapY =
        ball.radius +
        this.height / 2 -
        Math.abs(ball.y - (this.y + this.height / 2));

      if (overlapX < overlapY) {
        // Horizontal collision
        if (ball.x < this.x) {
          this.hitLeft(ball);
        } else {
          this.hitRight(ball);
        }
      } else {
        // Vertical collision
        if (ball.y < this.y) {
          this.hitTop(ball);
        } else {
          this.hitBottom(ball);
        }
      }

      // 부서진 블록 수 증가
      if (this.increaseBrokenBlocks) {
        this.increaseBrokenBlocks();
      }
      let blockAudio = new Audio(
        "https://taira-komori.jpn.org/sound_os2/game01/select01.mp3"
      ); // 임시
      blockAudio.play();

      console.log(increaseScore);
      // 점수 증가
      if (increaseScore) {
        console.log("score2");

        increaseScore();
      }

      // 25% 확률로 아이템 생성
      if (Math.random() < 0.25) {
        const itemType = Math.random() < 0.5 ? "speed" : "ball";
        items.push(
          new Item(this.x + this.width / 2, this.y + this.height / 2, itemType)
        );
      }

      return true;
    }
    return false;
  }

  isHit(tower) {
      let distance = Math.hypot(tower.x - this.x, tower.y - this.y);
      return distance < tower.range;
  }

  move() {
    if (this.pathIndex < this.path.length - 1) {
        let target = this.path[this.pathIndex + 1];
        let dx = target.x - this.x;
        let dy = target.y - this.y;
        let dist = Math.hypot(dx, dy);

        if (dist < this.speed) {
            this.x = target.x;
            this.y = target.y;
            this.pathIndex++;
        } else {
            this.x += (dx / dist) * this.speed;
            this.y += (dy / dist) * this.speed;
        }
    }
  }

  draw(ctx) {
    console.log(`Drawing block at (${this.x}, ${this.y})`); // 콘솔 로그 추가
    if (this.visible) {
      let image = new Image();
      image.src = './source/Cy-Bug.png';

      ctx.drawImage(image, this.x, this.y, this.width, this.height);
    }
  }
}