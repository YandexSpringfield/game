import { Trait } from '.';

export class Jump extends Trait {
  duration: number;

  engageTime: number;

  velocity: number;

  cancel: boolean;

  constructor() {
    super('jump');

    this.duration = 0.2;
    this.engageTime = 0;
    this.velocity = 350;
    this.cancel = true;
  }

  start() {
    this.engageTime = this.duration;
  }

  stop() {
    this.engageTime = 0;
  }

  update(entity, deltaTime) {
    /* eslint-disable no-param-reassign */
    if (this.engageTime > 0) {
      entity.vel.y = -this.velocity;
      this.engageTime -= deltaTime;
    }
  }
}
