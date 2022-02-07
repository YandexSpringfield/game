import { Entity } from '@containers/GamePlay/Canvas/entity';
import { SpriteResolver } from '@containers/GamePlay';
import { Matrix } from '@containers/GamePlay/Canvas/core';
import { EntityEvents } from '@containers/GamePlay/Canvas/entity/Entity';
import { TileConverter, ITile } from './TileConverter';

export class TileCollider extends TileConverter {
  public spriteResolver: SpriteResolver;

  public context: CanvasRenderingContext2D;

  constructor(
    matrix: Matrix,
    coinMatrix: Matrix,
    spriteResolver: SpriteResolver,
    context: CanvasRenderingContext2D,
  ) {
    super(matrix, coinMatrix);

    this.spriteResolver = spriteResolver;
    this.context = context;
  }

  private _matchCoin(match: ITile, entity: Entity) {
    const indexX = this.toIndex(match.x1);
    const indexY = this.toIndex(match.y1);
    const bg = this.matrix.get(indexX, indexY);

    if (bg) {
      this.coinMatrix.delete(indexX, indexY);
      entity.spriteResolver.draw(
        bg.name,
        this.context,
        this.spriteResolver.width * indexX,
        this.spriteResolver.width * indexY,
      );
      entity.eventBus.emit(EntityEvents.coin);
    }
  }

  checkX(entity: Entity) {
    let x;

    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.width;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else {
      return;
    }

    const matches = this.searchByRange(
      x,
      x,
      entity.pos.y,
      entity.pos.y + entity.height,
    );

    matches.forEach((match: ITile) => {
      if (match.tile.name === 'coin') {
        this._matchCoin(match, entity);
      }

      if (!['ground', 'chance'].includes(match.tile.name)) {
        return;
      }

      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.width > match.x1) {
          entity.pos.set(match.x1 - entity.width, entity.pos.y);
          entity.vel.set(0, entity.vel.y);
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.pos.set(match.x2, entity.pos.y);
          entity.vel.set(0, entity.vel.y);
        }
      }
    });
  }

  checkY(entity: Entity) {
    let y;

    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.height;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }

    const matches = this.searchByRange(
      entity.pos.x,
      entity.pos.x + entity.width,
      y,
      y,
    );

    matches.forEach((match: ITile) => {
      if (match.tile.name === 'coin') {
        this._matchCoin(match, entity);
      }

      if (!['ground', 'chance'].includes(match.tile.name)) {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.height > match.y1) {
          entity.pos.set(entity.pos.x, match.y1 - entity.height);
          entity.vel.set(entity.vel.x, 0);
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          entity.jump.cancel = false;
        }
      } else if (entity.vel.y < 0) {
        if (entity.pos.y < match.y2) {
          entity.pos.set(entity.pos.x, match.y2);
          entity.vel.set(entity.vel.x, 0);
        }
      }
    });
  }
}
