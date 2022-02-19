import { Trait } from './index';

export class Go extends Trait {
  direction: number;

  speed: number;

  constructor() {
    super('go');

    this.direction = 0;
    this.speed = 7000;
  }

  update(entity, deltaTime) {
    /* eslint-disable no-param-reassign */
    entity.vel.x = this.speed * this.direction * deltaTime;
  }
}
