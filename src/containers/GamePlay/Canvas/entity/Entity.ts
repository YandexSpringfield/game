import { TileCollider } from '../collision';
import { tilesSize } from '../sprite-resolver';
import { Vectors } from './Vectors';

export class Entity {
  pos: Vectors;

  vel: Vectors;

  width: number;

  height: number;

  gravity: number;

  tileCollider: TileCollider;

  traits: any[];

  constructor(matrix, coinMatrix) {
    this.pos = new Vectors(0, 0);
    this.vel = new Vectors(0, 0);
    this.width = tilesSize.width;
    this.height = tilesSize.height;

    this.gravity = 1000;

    this.tileCollider = new TileCollider(matrix, coinMatrix);

    this.traits = [];
  }

  addTraits(...traits) {
    traits.forEach((trait) => {
      this.traits.push(trait);
      this[trait.NAME] = trait;
    });
  }

  updateTraits(deltaTime) {
    this.traits.forEach((trait) => {
      trait.update(this, deltaTime);
    });
  }
}
