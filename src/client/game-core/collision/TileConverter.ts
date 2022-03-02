import { tilesSize, tilesTypes } from '../sprite-resolver/spriteConfig';

export interface ITile {
  tile: { name: string; type: string | undefined };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export class TileConverter {
  tileSize: number;

  constructor() {
    this.tileSize = tilesSize.width;
  }

  toIndex(pos: number): number {
    return Math.floor(pos / this.tileSize);
  }

  getEnemies(level, indexX, indexY): string | undefined {
    if (level.goomba.pos[0] === indexX && level.goomba.pos[1] === indexY) {
      return 'goomba';
    }

    return undefined;
  }

  getTiles(level, indexX, indexY): string | undefined {
    const ground = indexY >= 13 ? 'ground' : undefined;
    return level.tiles[`${indexX}.${indexY}`] || ground;
  }

  getByIndex(element, indexX, indexY): ITile | undefined {
    if (element) {
      const tile = tilesTypes[element];
      const x1 = indexX * this.tileSize;
      const x2 = x1 + this.tileSize;
      const y1 = indexY * this.tileSize;
      const y2 = y1 + this.tileSize;
      return {
        tile,
        x1,
        x2,
        y1,
        y2,
      };
    }

    return undefined;
  }

  toIndexRange(pos1: number, pos2: number) {
    const posMax = Math.ceil(pos2 / this.tileSize) * this.tileSize;
    const range: number[] = [];
    let pos = pos1;

    do {
      range.push(this.toIndex(pos));
      pos += this.tileSize;
    } while (pos < posMax);

    return range;
  }

  searchByRange(level, x1, x2, y1, y2) {
    const matches: ITile[] = [];

    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const matchBg = this.getByIndex(
          this.getTiles(level, indexX, indexY),
          indexX,
          indexY,
        );
        const matchEnemies = this.getByIndex(
          this.getEnemies(level, indexX, indexY),
          indexX,
          indexY,
        );

        if (matchBg) {
          matches.push(matchBg);
        }

        if (matchEnemies) {
          matches.push(matchEnemies);
        }
      });
    });

    return matches;
  }
}
