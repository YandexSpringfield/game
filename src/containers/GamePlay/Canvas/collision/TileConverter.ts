import { Matrix } from '../core/Matrix';
import { OverworldName, tilesSize } from '../sprite-resolver/spriteConfig';

export interface ITile {
  tile: { name: OverworldName; type: string | undefined };
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}

export class TileConverter {
  matrix: Matrix;

  coinMatrix: Matrix;

  tileSize: number;

  constructor(matrix: Matrix, coinMatrix: Matrix) {
    this.matrix = matrix;
    this.coinMatrix = coinMatrix;
    this.tileSize = tilesSize.width;
  }

  toIndex(pos: number): number {
    return Math.floor(pos / this.tileSize);
  }

  getByIndex(matrix, indexX, indexY): ITile | undefined {
    const tile = matrix.get(indexX, indexY);

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
        const matchBg = this.getByIndex(this.matrix, indexX, indexY);
        const matchCoin = this.getByIndex(this.coinMatrix, indexX, indexY);

        if (matchBg) {
          matches.push(matchBg);
        }

        if (matchCoin) {
          matches.push(matchCoin);
        }
      });
    });

    return matches;
  }
}
