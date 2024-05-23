class Boss {
  constructor(canvas, x, y, onDefeated) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = -100; // 보스의 초기 y 좌표를 화면 밖으로 설정
    this.targetY = y; // 목표 위치를 설정
    this.width = 300; // 보스의 너비를 300으로 설정
    this.height = this.width / 1.28;
    this.hp = 10;
    this.maxHp = 10; // 보스의 최대 HP
    this.isRemoved = false;
    this.bullets = [];
    this.image = new Image();
    this.image.src = "../source/game3_boss.png";
    this.isHit = false; // 보스가 공에 맞았는지 여부를 나타내는 플래그
    this.hitTimer = null; // 보스가 공에 맞았을 때 타이머를 관리하기 위한 변수
    this.onDefeated = onDefeated; // 보스가 패배했을 때 호출될 콜백 함수

    this.image.onload = () => {
      this.draw();
    };
  }

  draw() {
    if (this.hp <= 0) {
      this.isRemoved = true;
      this.onDefeated();
      return;
    }

    if (this.image.complete) {
      if (this.isHit) {
        // 보스가 맞았을 때 빨갛게 투명 배경을 그림
        this.context.save();
        this.context.globalAlpha = 0.5;
        this.context.fillStyle = "red";
        this.context.fillRect(this.x, this.y, this.width, this.height);
        this.context.restore();
      }
      this.context.drawImage(
        this.image,
        this.x,
        this.y,
        this.width,
        this.height
      );
    } else {
      // 보스 이미지가 로드되지 않은 경우 기본 사각형으로 표시
      this.context.fillStyle = "red";
      this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    // HP 바를 그림
    this.context.fillStyle = "black";
    this.context.fillRect(this.x, this.y - 20, this.width, 10); // HP 바 배경
    this.context.fillStyle = "green";
    this.context.fillRect(
      this.x,
      this.y - 20,
      (this.width * this.hp) / this.maxHp,
      10
    ); // HP 바 게이지
  }

  update() {
    if (this.hp <= 0) return;

    // 보스가 천천히 내려오도록 y 좌표를 증가시킴
    if (this.y < this.targetY) {
      this.y += 1; // 내려오는 속도 조절
    }

    this.bullets.forEach((bullet) => bullet.update());
    this.bullets = this.bullets.filter((bullet) => !bullet.isRemoved);
  }

  shoot() {
    const random = Math.random();
    for (let i = 0; i < 10; i++) {
      const angle = (i * Math.PI * random) / 5; // 총알이 전방으로 발사되도록 각도를 조정
      const dx = Math.cos(angle);
      const dy = Math.sin(angle);
      this.bullets.push(
        new Bullet(
          this.canvas,
          this.x + this.width / 2,
          this.y + this.height,
          dx,
          dy
        )
      );
    }
  }

  takeDamage() {
    this.hp -= 1;
    this.isHit = true;

    // 보스가 맞았을 때 0.5초 후에 다시 원래 상태로 돌아가게 함
    clearTimeout(this.hitTimer);
    this.hitTimer = setTimeout(() => {
      this.isHit = false;
    }, 500);
  }
}
