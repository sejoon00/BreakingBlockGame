class Canvas {
  constructor(backgroundimageUrl) {
    this.backgroundimageUrl = backgroundimageUrl;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.backgroundimage = new Image();
    this.ballInitialX;
    this.ballInitialY;
    this.balls = []; // 공 리스트 초기화
    this.blocks = []; // 블록 리스트 초기화
    this.paddle;    //막대기 추가

    this.backgroundimage.onload = () => {
      this.canvas.width = this.backgroundimage.width;
      this.canvas.height = this.backgroundimage.height;
      this.ballInitialX = (this.canvas.width /2);
      this.ballInitialY = (this.canvas.height - 100);
      this.drawBackground();
      this.initGameElements();
      this.startGameLoop();
      
      console.log(this.ballInitialX)

    };
    this.backgroundimage.src = backgroundimageUrl;
  }

  drawBackground() {
    this.context.drawImage(this.backgroundimage, 0, 0);
  }

  appendTo(element) {
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    element.appendChild(this.canvas);
  }

  //게임 내 요소들을 초기화합니다.
  initGameElements() {
    this.balls.push(new Ball(this.ballInitialX, this.ballInitialY, 4, -4, 10, "#0095DD"));
    this.balls.push(new Ball(this.ballInitialX, this.ballInitialY, 4, -4, 10, "#0095DD"));
    

    this.paddle = new Paddle(this.canvas, 100, 10, 10);
    this.paddle.bindMouseMove();
  
    // 블록의 시작 y 위치
    let startY = 110; 
    const blockWidth = 40;
    const blockHeight = 70;
    const blockSpacingX = 40; // 블록 간 x 간격
    const blockSpacingY = 60; // 블록 간 y 간격

  
    // 블록 배치
    for (let row = 0; row < 4; row++) {
      let startX = 300; // 블록의 시작 x 위치
      let numBlocks = row < 2 ? 5 : 4; // 각 행의 블록 수

      for (let i = 0; i < numBlocks; i++) {
        this.blocks.push(new Block(startX, startY, blockWidth, blockHeight));
        // 간격 조정
        if (row >= 2 && i == 1) {
          startX += blockWidth + 120; // 2번과 3번 블록 사이 100px 간격
        } else {
          startX += blockWidth + blockSpacingX; // 나머지 블록 간 기본 간격
        }
      }
  
      // 다음 행으로 이동
      startY += blockHeight + blockSpacingY; // 1번 행과 2번 행 사이 100px 간격
    }
  }
  

  //공 개수 증가 아이템을 먹을시 추가 공을 화면에 그리는 함수
  addBall(dx, dy, radius, color) {
    const newBall = new Ball(x, y, dx, dy, radius, color);
    this.balls.push(newBall);
  }

  //화면에 요소들을 일정주기마다 다시 그립니다.
  startGameLoop() {
    const update = () => {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.drawBackground(); // 배경 다시 그리기
      this.blocks.forEach(block => {
        block.draw(this.context); // 블록 그리기
      });
      this.balls.forEach(ball => {
        ball.draw(this.context);
        ball.update(this.canvas, this.blocks,this.paddle);
      });

      this.paddle.draw(); // 막대기 그리기 추가
      
      requestAnimationFrame(update);
    };
    update();
  }
}
