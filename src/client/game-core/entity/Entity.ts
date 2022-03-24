import { Vectors } from '@game-core/entity/Vectors';
import { SpriteResolver } from '@game-core';
import { tilesSize } from '@game-core/sprite-resolver';
import { TLevel } from '@game-core/levels';

export enum EntityEvents {
  selectCoin = 'selectCoin',
}

export class Entity {
  pos: Vectors;

  vel: Vectors;

  name: string;

  width: number;

  height: number;

  gravity: number;

  traits: any[];

  level: TLevel;

  spriteResolver: SpriteResolver;

  constructor([spriteResolver, level], name) {
    this.pos = new Vectors(0, 0);
    this.vel = new Vectors(0, 0);
    this.width = tilesSize.width;
    this.height = tilesSize.height;
    this.name = name;

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
