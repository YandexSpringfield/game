export class Timer {
    constructor() {
        this.animate = (time) => {
            this.deltaTime = time - this.lastTime;
            if (this.deltaTime < this.maxInterval) {
                this.update(this.deltaTime / 1000, Math.trunc((time - this.accumulatedTime) / 1000));
            }
            this.lastTime = time;
            this.totalTime = time;
            this.enqueue();
        };
        this.deltaTime = 0;
        this.lastTime = 0;
        this.maxInterval = 40;
        this.accumulatedTime = 0;
        this.continueAnimating = true;
    }
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
        this.accumulatedTime = this.totalTime;
        this.continueAnimating = false;
        this.update = () => { };
    }
}
