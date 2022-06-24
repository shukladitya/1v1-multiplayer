class Sprite {
    constructor(src, positionX, positionY, frames) {
      this.positionX = positionX;
      this.positionY = positionY;
      this.image = new Image();
      this.image.src = src;
      this.frames = frames;
      this.currentFrameNumber = 0;
      this.width = innerWidth;
      this.height = innerHeight;
      this.framesElapsed = 0;
      this.frameshold = 10;
    }
    draw = () => {
      c.drawImage(
        this.image,
        0 +
          (this.currentFrameNumber % this.frames) *
            (this.image.width / this.frames),
        0,
        this.image.width / this.frames,
        this.image.height,
        this.positionX,
        this.positionY,
        this.width,
        this.height
      );
    };
    updateFrames = () => {
      this.framesElapsed++;
      if (this.framesElapsed % this.frameshold == 0) {
        this.currentFrameNumber++;
      }
      this.draw();
    };
  }

