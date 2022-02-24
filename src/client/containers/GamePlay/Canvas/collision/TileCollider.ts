import { Entity } from 'src/client/containers/GamePlay/Canvas/entity';
import { EntityEvents } from 'src/client/containers/GamePlay/Canvas/entity/Entity';
import { OverworldName } from 'src/client/containers/GamePlay/Canvas/sprite-resolver/spriteConfig';
import { TileConverter, ITile } from './TileConverter';

const breaksToEntityPrevent: OverworldName[] = [
  OverworldName.Chance,
  OverworldName.Ground,
  OverworldName.Bricks,
  OverworldName.Chocolate,
];

export class TileCollider extends TileConverter {
  /**
   * Method for matching a coin and notifying entity about it
   */
  private _notifyCoin(match: ITile, entity: Entity) {
    const indexX = this.toIndex(match.x1);
    const indexY = this.toIndex(match.y1);
    entity.eventBus.emit(EntityEvents.selectCoin, indexX, indexY);
  }

  /**
   * Method for matching a break and notifying entity about it
   */
  private _notifyBreak(match: ITile, entity: Entity) {
    const indexX = this.toIndex(match.x1);
    const indexY = this.toIndex(match.y1);
    entity.eventBus.emit(EntityEvents.break, indexX, indexY);
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
        this._notifyCoin(match, entity);
      }

      if (!breaksToEntityPrevent.includes(match.tile.name)) {
        this._notifyBreak(match, entity);
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
        this._notifyCoin(match, entity);
      }

      if (!breaksToEntityPrevent.includes(match.tile.name)) {
        this._notifyBreak(match, entity);
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
