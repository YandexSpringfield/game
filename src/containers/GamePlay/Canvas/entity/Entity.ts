import { Vectors } from './Vectors';

export class Entity {
  pos: Vectors;

  vel: Vectors;

  traits: any[];

  constructor() {
    this.pos = new Vectors(0, 0);
    this.vel = new Vectors(0, 0);

    this.traits = [];
  }

  addTraits(...traits) {
    traits.forEach((trait) => {
      this.traits.push(trait);
      this[trait.NAME] = trait;
    });
  }

  update(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
}
