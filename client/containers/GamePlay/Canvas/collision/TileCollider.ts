import { Entity } from '@containers/GamePlay/Canvas/entity';
import { TileConverter, ITile } from './TileConverter';

export class TileCollider extends TileConverter {
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
      if (match.tile.type !== 'ground') {
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

  checkY(entity) {
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
      if (match.tile.type !== 'ground') {
        return;
      }

      if (entity.vel.y > 0) {
        if (entity.pos.y + entity.height > match.y1) {
          entity.pos.set(entity.pos.x, match.y1 - entity.height);
          entity.vel.set(entity.vel.x, 0);
          // eslint-disable-next-line
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
