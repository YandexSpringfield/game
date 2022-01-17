export class Timer {
  updateTime: (t: number) => void;

  update: (t: number) => void;

  constructor(deltaTime = 1 / 60) {
    let accumulatedTime = 0;
    let lastTime = 0;

    this.updateTime = (time) => {
      accumulatedTime += (time - lastTime) / 1000;

      while (accumulatedTime > deltaTime) {
        this.update(deltaTime);
        accumulatedTime -= deltaTime;
      }

      lastTime = time;

      this.enqueue();
    };
  }

  enqueue() {
    requestAnimationFrame(this.updateTime);
  }

  start() {
    this.enqueue();
  }
}
