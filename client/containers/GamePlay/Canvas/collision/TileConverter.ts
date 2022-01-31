import { Matrix } from '../core/Matrix';
import { tilesSize } from '../sprite-resolver/spriteConfig';

export interface ITile {
  tile: { name: string; type: string | undefined };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export class TileConverter {
  matrix: Matrix;

  tileSize: number;

  constructor(matrix) {
    this.matrix = matrix;
    this.tileSize = tilesSize.width;
  }

  toIndex(pos: number): number {
    return Math.floor(pos / this.tileSize);
  }

  getByIndex(indexX, indexY): ITile | undefined {
    const tile = this.matrix.get(indexX, indexY);

    if (tile) {
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

  searchByRange(x1, x2, y1, y2) {
    const matches: ITile[] = [];

    this.toIndexRange(x1, x2).forEach((indexX) => {
      this.toIndexRange(y1, y2).forEach((indexY) => {
        const match = this.getByIndex(indexX, indexY);

        if (match) {
          matches.push(match);
        }
      });
    });

    return matches;
  }
}
