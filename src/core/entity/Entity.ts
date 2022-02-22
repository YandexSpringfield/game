import { Vectors } from '@core/entity/Vectors';
import { SpriteResolver } from '@core';
import { tilesSize } from '@core/sprite-resolver';

export enum EntityEvents {
  selectCoin = 'selectCoin',
}

export class Entity {
  pos: Vectors;

  vel: Vectors;

  width: number;

  height: number;

  gravity: number;

  traits: any[];

  level: {};

  spriteResolver: SpriteResolver;

  constructor([spriteResolver, level]) {
    this.pos = new Vectors(0, 0);
    this.vel = new Vectors(0, 0);
    this.width = tilesSize.width;
    this.height = tilesSize.height;

    this.gravity = 1000;

    this.traits = [];

    this.spriteResolver = spriteResolver;
    this.level = level;
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
