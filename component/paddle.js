class Paddle {
    constructor(canvas, width, height, speed) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.x = (this.canvas.width - this.width) / 2; // 막대기의 초기 X 위치
        this.y = this.canvas.height - this.height - 20; // 막대기의 Y 위치
        this.speed = speed;
    }

    // 막대기 그리기 함수
    draw() {
        const ctx = this.canvas.getContext('2d');
        ctx.beginPath();
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = '#333';
        ctx.fill();
        ctx.closePath();
    }

    // 이벤트 리스너 등록 (마우스 이동)
    bindMouseMove() {
        document.addEventListener('mousemove', (e) => {
            const relativeX = e.clientX - this.canvas.offsetLeft;
            if (relativeX > 0 && relativeX < this.canvas.width) {
                this.x = relativeX - this.width / 2;
            }
        });
    }

    // 막대기 이동 함수
    movePaddle(direction) {
        if (direction === 'left' && this.x > 0) {
            this.x -= this.speed;
        } else if (direction === 'right' && this.x < this.canvas.width - this.width) {
            this.x += this.speed;
        }
    }

    //Block에서 가져와서 재사용
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
            ball.dx = collisionPointX * 0.1; // 이 수치는 반사 각의 정도를 조절합니다.
            ball.dy = -ball.dy; // 공을 위쪽으로 튕깁니다.
            return true; // 충돌이 발생했음을 반환합니다.
        }
        return false; // 충돌이 발생하지 않았음을 반환합니다.
    }
}
