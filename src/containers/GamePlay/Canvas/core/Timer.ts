export class Timer {
  update: (t: number) => void;

  deltaTime: number;

  maxInterval: number;

  lastTime: number;

  continueAnimating: boolean;

  constructor() {
    this.deltaTime = 0;
    this.lastTime = 0;
    this.maxInterval = 40;
    this.continueAnimating = true;
  }

  animate = (time) => {
    this.deltaTime = time - this.lastTime;

    if (this.deltaTime < this.maxInterval) {
      this.update(this.deltaTime / 1000);
    }

    this.lastTime = time;

    this.enqueue();
  };

  enqueue() {
    if (this.continueAnimating) {
      requestAnimationFrame(this.animate);
    }
  }

  start() {
    this.continueAnimating = true;
    this.enqueue();
  }

  stop() {
    this.continueAnimating = false;
    this.update = () => {};
  }
}
