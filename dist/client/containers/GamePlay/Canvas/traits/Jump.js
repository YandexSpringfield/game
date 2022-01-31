import { Trait } from '.';
export class Jump extends Trait {
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
        if (this.engageTime > 0) {
            entity.vel.y = -this.velocity;
            this.engageTime -= deltaTime;
        }
    }
}
