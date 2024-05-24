//곤용 -바나나 만들기
class Banana {
    constructor(canvas, imageSrc, size, x, y) {
      this.canvas = canvas;
      this.context = canvas.getContext("2d");
      this.image = new Image();
      this.image.src = imageSrc;
      this.size = size;
      this.x = x;
      this.y = y;
    }
  
    draw() {
      this.context.drawImage(this.image, this.x, this.y, this.size, this.size);
    }

    //바나나 충돌 감지
    isColliding(ball) {
      const distX = Math.abs(ball.x - this.x - this.size / 2);
      const distY = Math.abs(ball.y - this.y - this.size / 2);
  
      if (distX > (this.size / 2 + ball.radius) || distY > (this.size / 2 + ball.radius)) {
        return false;
      }
  
      if (distX <= (this.size / 2) || distY <= (this.size / 2)) {
        return true;
      }
  
      const dx = distX - this.size / 2;
      const dy = distY - this.size / 2;
      return (dx * dx + dy * dy <= (ball.radius * ball.radius));
    }
  }