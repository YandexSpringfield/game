import { ITile, TileConverter } from '@game-core/collision/TileConverter';
import { OverworldEntity } from '@game-core/sprite-resolver/spriteConfig';
import { Entity, EntityEvents } from '@game-core/entity';
import { GAME_END, eventBus } from '@game-core';

class TileCollider extends TileConverter {
  private _notifyCoin(match: ITile) {
    const indexX = this.toIndex(match.x1);
    const indexY = this.toIndex(match.y1);

    eventBus.emit(EntityEvents.selectCoin, indexX, indexY);
  }

  checkX(entity: Entity, level) {
    let x;

    if (entity.vel.x > 0) {
      x = entity.pos.x + entity.width;
    } else if (entity.vel.x < 0) {
      x = entity.pos.x;
    } else {
      return;
    }

    const matches = this.searchByRange(
      level,
      x,
      x,
      entity.pos.y,
      entity.pos.y + entity.height,
    );

    matches.forEach((match: ITile) => {
      if (!match.tile.type) {
        return;
      }

      if (
        entity.name === OverworldEntity.Goomba &&
        match.tile.type === 'enemy'
      ) {
        return;
      }

      if (match.tile.name === 'coin' && entity.name === OverworldEntity.Mario) {
        this._notifyCoin(match);
      }

      if (
        match.tile.type === 'enemy' &&
        entity.name === OverworldEntity.Mario
      ) {
        if (entity.pos.x + entity.width > match.x1 || entity.pos.x < match.x2) {
          eventBus.emit(GAME_END, 'lost');
        }
      }

      if (entity.vel.x > 0) {
        if (entity.pos.x + entity.width > match.x1) {
          entity.pos.set(match.x1 - entity.width, entity.pos.y);
          entity.vel.set(0, entity.vel.y);
          if (entity.name === OverworldEntity.Goomba) {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            entity.direction = -1;
          }
        }
      } else if (entity.vel.x < 0) {
        if (entity.pos.x < match.x2) {
          entity.pos.set(match.x2, entity.pos.y);
          entity.vel.set(0, entity.vel.y);
          if (entity.name === OverworldEntity.Goomba) {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            entity.direction = 1;
          }
        }
      }
    });
  }

  checkY(entity: Entity, level) {
    let y;

    if (entity.vel.y > 0) {
      y = entity.pos.y + entity.height;
    } else if (entity.vel.y < 0) {
      y = entity.pos.y;
    } else {
      return;
    }

    const matches = this.searchByRange(
      level,
      entity.pos.x,
      entity.pos.x + entity.width,
      y,
      y,
    );

    matches.forEach((match: ITile) => {
      if (match.tile.name === 'coin') {
        this._notifyCoin(match);
      }

      if (
        match.tile.name === OverworldEntity.Goomba &&
        entity.name === OverworldEntity.Mario
      ) {
        eventBus.emit('kill');
      }

      if (!match.tile.type) {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.height > match.y1) {
          entity.pos.set(entity.pos.x, match.y1 - entity.height);
          entity.vel.set(entity.vel.x, 0);
          // @ts-ignore
          // eslint-disable-next-line no-param-reassign
          if (entity.jump) {
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            entity.jump.cancel = false;
          }
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

export const tileCollider = new TileCollider();
