class Block {
  constructor(
    x,
    y,
    width,
    height,
    increaseBrokenBlocks,
    imageSrc,
    path,
    requiredHits = 1
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.visible = true;
    this.image = new Image();
    this.image.src = imageSrc;
    this.increaseBrokenBlocks = increaseBrokenBlocks; // 부서진 블록 수 증가 콜백
    this.isVanellope = false; // 바닐로페 여부
    this.path = path; // 블록 이동 경로
    this.pathIndex = 0; // 현재 경로 인덱스
    this.hitCount = 0; // 맞은 횟수
    this.requiredHits = requiredHits; // 부서지기 위해 필요한 횟수
  }

  move() {
    if (this.pathIndex < this.path.length) {
      const target = this.path[this.pathIndex];
      const dx = target.x - this.x;
      const dy = target.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const speed = 0.8; // 블록 이동 속도

      if (distance < speed) {
        this.x = target.x;
        this.y = target.y;
        this.pathIndex++;
      } else {
        this.x += (dx / distance) * speed;
        this.y += (dy / distance) * speed;
      }
    }
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
      this.hitCount++;
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
      console.log(this.requiredHits);
      if (this.hitCount < this.requiredHits) {
        return false; // 필요한 히트 횟수만큼 맞지 않으면 return
      }

      this.visible = false; // 블럭을 보이지 않게 설정

      // 부서진 블록 수 증가
      if (this.increaseBrokenBlocks) {
        this.increaseBrokenBlocks();
      }
      let blockAudio = new Audio(
        "https://taira-komori.jpn.org/sound_os2/game01/select01.mp3"
      ); // 임시
      blockAudio.play();

      // 점수 증가
      if (increaseScore) {
        increaseScore();
      }
      if (this.isVanellope) {
        return true;
      }
      let random = 0.25;

      if (selectTargetGame === "game1") {
        if (Math.random() < 0.25) {
          const itemType = Math.random() < 0.5 ? "speed" : "increaseball";
          items.push(
            new Item(
              this.x + this.width / 2,
              this.y + this.height / 2,
              itemType
            )
          );
        }
      } else if (selectTargetGame === "game2") {
        const itemTypes = [
          "increaseheart",
          "decreaseheart",
          "increasevanellopespeed",
          "decreasevanellopespeed",
          "increasemonsterspeed",
          "decreasemonsterspeed",
        ];
        const randomIndex = Math.floor(Math.random() * itemTypes.length);
        const itemType = itemTypes[randomIndex];
        items.push(
          new Item(this.x + this.width / 2, this.y + this.height / 2, itemType)
        );
      }

      if (selectTargetGame == "game3") {
        if (Math.random() < 0.25) {
          const itemType = Math.random();
          let type;
          if (itemType < 0.5) {
            type = "ball";
          } else {
            type = "light";
          }
          items.push(
            new Item(this.x + this.width / 2, this.y + this.height / 2, type)
          );
        }
      } else {
        if (Math.random() < random) {
          const itemType = Math.random() < 0.5 ? "speed" : "ball";
          items.push(
            new Item(
              this.x + this.width / 2,
              this.y + this.height / 2,
              itemType
            )
          );
        }
      }

      return true;
    }
  }

  draw(ctx) {
    if (this.visible) {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      if (selectTargetGame == "game3") this.drawHitBar(ctx); // 히트 게이지 바 그리기
    }
  }

  drawHitBar(ctx) {
    const barWidth = this.width;
    const barHeight = 5;
    const barX = this.x;
    const barY = this.y - barHeight - 2; // 블록 위에 게이지 바를 그림

    // 배경 바
    ctx.fillStyle = "red";
    ctx.fillRect(barX, barY, barWidth, barHeight);

    // 현재 hitCount에 비례하는 초록색 게이지 바
    const greenBarWidth =
      (barWidth * (this.requiredHits - this.hitCount)) / this.requiredHits;
    ctx.fillStyle = "#80E12A";
    ctx.fillRect(barX, barY, greenBarWidth, barHeight);
  }

  isOutOfBounds(canvasHeight) {
    return this.y + this.height > canvasHeight;
  }
}
