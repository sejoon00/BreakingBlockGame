class Ball {
  constructor(x, y, dx, dy, radius, color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.isRemoved = false; // 공 제거 여부를 표시하는 속성 추가
    this.hitCooldowns = new Map(); // 충돌 쿨다운 맵 추가
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  update(canvas, blocks, paddle, items, increaseScore, decreaseLife, boss) {
    // 캔버스 좌우 경계 체크하여 방향 반전
    if (
      this.x + this.dx > canvas.width - this.radius ||
      this.x + this.dx < this.radius
    ) {
      this.dx = -this.dx;
    }
    // 캔버스 상단 경계 체크하여 방향 반전
    if (this.y + this.dy < this.radius + 60) {
      this.dy = -this.dy;
    }
    // 캔버스 하단 경계 체크 (공이 화면 아래로 떨어지는 경우)
    if (
      this.y + this.dy > canvas.height - 140 - this.radius &&
      selectTargetGame != "game3"
    ) {
      // 공을 제거할 플래그 설정
      if (!this.isRemoved) {
        // 생명 감소 로직이 한 번만 실행되도록 조건 추가
        this.isRemoved = true;
        console.log("땅에 닿았음");
        decreaseLife();
      }
      return;
    }

    // 이동 전 충돌 검사
    blocks.forEach((block) => {
      if (block.visible && !this.hitCooldowns.has(block)) {
        if (block.isHit(this, items, increaseScore)) {
          this.setHitCooldown(block); // 충돌 쿨다운 설정
        }
      }
    });

    if (!this.hitCooldowns.has(paddle) && paddle.isHitPaddle(this)) {
      this.setHitCooldown(paddle); // 충돌 쿨다운 설정

      let paddleAudio = new Audio(
        "https://taira-komori.jpn.org/sound_os2/game01/jump09.mp3"
      );
      paddleAudio.play();
    }

    // 공 위치 업데이트
    this.x += this.dx;
    this.y += this.dy;

    let hisSize = this.radius + 2;

    // 보스와의 충돌 처리
    if (boss && !boss.isRemoved && !this.hitCooldowns.has(boss)) {
      const isSideHit =
        this.x - hisSize < boss.x || this.x + hisSize > boss.x + boss.width;
      if (
        this.x + hisSize > boss.x &&
        this.x - hisSize < boss.x + boss.width &&
        this.y + hisSize > boss.y &&
        this.y - hisSize < boss.y + boss.height
      ) {
        if (isSideHit) {
          this.dx = -this.dx; // 측면에 맞으면 x 방향 반전
          // 공이 보스의 왼쪽이나 오른쪽 경계를 넘어가지 않도록 위치 조정
          if (this.x < boss.x) {
            this.x = boss.x - hisSize;
          } else if (this.x > boss.x + boss.width) {
            this.x = boss.x + boss.width + hisSize;
          }
        } else {
          this.dy = -this.dy; // 상단이나 하단에 맞으면 y 방향 반전
          // 공이 보스의 상단이나 하단 경계를 넘어가지 않도록 위치 조정
          if (this.y < boss.y) {
            this.y = boss.y - hisSize;
          } else if (this.y > boss.y + boss.height) {
            this.y = boss.y + boss.height + hisSize;
          }
        }
        boss.takeDamage(); // HP를 1만 깎도록 설정
        this.setHitCooldown(boss); // 충돌 쿨다운 설정
      }
    }

    this.draw(canvas.getContext("2d"));
  }

  setHitCooldown(target) {
    this.hitCooldowns.set(target, true);
    setTimeout(() => {
      this.hitCooldowns.delete(target);
    }, 100); // 100ms 쿨다운
  }

  // 곤용 바나나 닿을 시 공 방향 랜덤 변경
  changeDirectionRandomly() {
    const angle = Math.random() * 2 * Math.PI;
    const speed = Math.sqrt(this.dx * this.dx + this.dy * this.dy);
    this.dx = speed * Math.cos(angle);
    this.dy = speed * Math.sin(angle);
  }
}
