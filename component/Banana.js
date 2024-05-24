class Banana {
  constructor(canvas, imageSrc, size, x, y) {
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
    this.image = new Image();
    this.image.src = imageSrc;
    this.size = size;
    this.x = x;
    this.y = y;
  }

  // 바나나를 캔버스에 그리는 메서드
  draw() {
    this.context.drawImage(this.image, this.x, this.y, this.size, this.size);
  }

  // 바나나와 공의 충돌 감지를 수행하는 메서드
  isColliding(ball) {
    const distX = Math.abs(ball.x - this.x - this.size / 2);
    const distY = Math.abs(ball.y - this.y - this.size / 2);

    if (
      distX > this.size / 2 + ball.radius ||
      distY > this.size / 2 + ball.radius
    ) {
      return false;
    }

    if (distX <= this.size / 2 || distY <= this.size / 2) {
      return true;
    }

    const dx = distX - this.size / 2;
    const dy = distY - this.size / 2;
    return dx * dx + dy * dy <= ball.radius * ball.radius;
  }

  // 바나나와 블록의 충돌 감지를 수행하는 메서드
  isCollidingWithBlock(block) {
    const blockCenterX = block.x + block.width / 2;
    const blockCenterY = block.y + block.height / 2;
    const bananaCenterX = this.x + this.size / 2;
    const bananaCenterY = this.y + this.size / 2;

    const distX = Math.abs(blockCenterX - bananaCenterX);
    const distY = Math.abs(blockCenterY - bananaCenterY);

    // 바나나의 중앙과 블록의 중심이 가까운지 확인
    const collisionMargin = 5; // 중앙 충돌의 허용 오차
    return (
      distX <= block.width / 2 + collisionMargin &&
      distY <= block.height / 2 + collisionMargin
    );
  }
}
