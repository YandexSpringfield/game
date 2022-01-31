import { Trait } from '.';
export class Go extends Trait {
    constructor() {
        super('go');
        this.direction = 0;
        this.speed = 7000;
    }
    update(entity, deltaTime) {
        entity.vel.x = this.speed * this.direction * deltaTime;
    }
}
