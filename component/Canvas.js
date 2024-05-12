class Canvas {
  constructor(imageUrl) {
    this.imageUrl = imageUrl;
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.image = new Image();

    // 이미지 로딩이 완료되면 캔버스 크기 설정
    this.image.onload = () => {
      this.canvas.width = this.image.width;
      this.canvas.height = this.image.height;
      this.drawBackground();
    };

    // 이미지 URL 설정 및 이미지 로딩 시작
    this.image.src = imageUrl;
  }

  drawBackground() {
    // 이미지를 캔버스에 그리기
    this.context.drawImage(this.image, 0, 0);
  }

  appendTo(element) {
    // 캔버스를 특정 DOM 요소에 추가
    if (typeof element === "string") {
      element = document.querySelector(element);
    }
    element.appendChild(this.canvas);
  }
}

// 사용 예
const myCanvas = new Canvas("path/to/background-image.jpg");
myCanvas.appendTo("body"); // body 태그에 캔버스 요소 추가
