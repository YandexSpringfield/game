import { Matrix } from '@containers/GamePlay/Canvas/core';
import { EventBus } from '@containers/GamePlay/Canvas/EventBus';
import { TileCollider } from '../collision';
import { SpriteResolver, tilesSize } from '../sprite-resolver';
import { Vectors } from './Vectors';

export enum EntityEvents {
  coin = 'coin',
}

export class Entity {
  pos: Vectors;

  vel: Vectors;

  width: number;

  height: number;

  gravity: number;

  tileCollider: TileCollider;

  traits: any[];

  public spriteResolver: SpriteResolver;

  public eventBus: EventBus;

  constructor(
    matrix: Matrix,
    coinMatrix: Matrix,
    spriteResolver: SpriteResolver,
    context: CanvasRenderingContext2D,
  ) {
    this.pos = new Vectors(0, 0);
    this.vel = new Vectors(0, 0);
    this.width = tilesSize.width;
    this.height = tilesSize.height;

    this.gravity = 1000;

    this.tileCollider = new TileCollider(
      matrix,
      coinMatrix,
      spriteResolver,
      context,
    );

    this.traits = [];
    this.spriteResolver = spriteResolver;
    this.eventBus = new EventBus();
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
