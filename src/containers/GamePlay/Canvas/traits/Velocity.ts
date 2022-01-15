import { Trait } from '.';

export class Velocity extends Trait {
  constructor() {
    super('velocity');
  }

  update(entity, deltaTime) {
    /* eslint-disable no-param-reassign */
    entity.pos.x += entity.vel.x * deltaTime;
    entity.pos.y += entity.vel.y * deltaTime;
  }
}
