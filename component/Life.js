class Life {
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
}
