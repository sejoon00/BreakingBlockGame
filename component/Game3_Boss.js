class Boss {
  constructor(canvas, x, y, onDefeated) {
    this.canvas = canvas;
    this.context = this.canvas.getContext("2d");
    this.x = x;
    this.y = -300; // 보스의 초기 y 좌표를 화면 밖으로 설정
    this.targetY = y; // 목표 위치를 설정
    this.width = 300; // 보스의 너비를 300으로 설정
    this.height = this.width / 1.28;
    this.hp = 30;
    this.maxHp = 30; // 보스의 최대 HP
    this.isRemoved = false;
    this.bullets = [];
    this.image = new Image();
    this.image.src = "../source/game3_boss.png";
    this.isHit = false; // 보스가 공에 맞았는지 여부를 나타내는 플래그
    this.hitTimer = null; // 보스가 공에 맞았을 때 타이머를 관리하기 위한 변수
    this.onDefeated = onDefeated; // 보스가 패배했을 때 호출될 콜백 함수
    this.direction = 1; // 좌우 이동 방향 (1: 오른쪽, -1: 왼쪽)
    this.speed = 0.3; // 이동 속도
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
    } else {
      this.move(); // 보스 이동 업데이트
    }

    this.bullets.forEach((bullet) => bullet.update());
    this.bullets = this.bullets.filter((bullet) => !bullet.isRemoved);
  }

  shoot() {
    const random = Math.random();
    for (let i = 0; i < 5; i++) {
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

  move() {
    if (this.x <= 40) {
      this.direction = 1; // 오른쪽으로 이동
    } else if (this.x + this.width >= this.canvas.width - 40) {
      this.direction = -1; // 왼쪽으로 이동
    }
    this.x += this.direction * this.speed;
  }

  takeDamage() {
    if (this.isInvincible) return; // 무적 상태일 때는 피해를 받지 않음

    this.hp -= 1;
    this.isHit = true;
    this.isInvincible = true; // 무적 상태로 설정

    // 보스가 맞았을 때 0.5초 후에 다시 원래 상태로 돌아가게 함
    clearTimeout(this.hitTimer);
    this.hitTimer = setTimeout(() => {
      this.isHit = false;
      this.isInvincible = false; // 무적 상태 해제
    }, 500);
  }
}
