import { level1 } from '@containers/GamePlay/Canvas/core/level-1';
import { Matrix } from '.';

const ROWS = 14;
const COLS = 150;

export class Level {
  matrix: Matrix;

  coinMatrix: Matrix;

  constructor() {
    this.matrix = new Matrix();
    this.coinMatrix = new Matrix();
    this.initMatrix();
  }

  public initMatrix() {
    for (let i = 0; i <= COLS; i += 1) {
      for (let j = 0; j <= ROWS; j += 1) {
        const element = level1[`${i}.${j}`];

        switch (element) {
          case 'ground':
            this.matrix.set(i, j, { name: 'ground' });
            break;

          case 'sky':
            this.matrix.set(i, j, { name: 'sky' });
            break;

          case 'bricks':
            this.matrix.set(i, j, { name: 'bricks' });
            break;

          case 'chocolate':
            this.matrix.set(i, j, { name: 'chocolate' });
            break;

          case 'chance':
            this.matrix.set(i, j, { name: 'chance' });
            break;

          case 'coin':
            this.matrix.set(i, j, { name: 'sky' });
            this.coinMatrix.set(i, j, { name: 'coin' });
            break;

          default:
            if (j <= ROWS - 2) {
              this.matrix.set(i, j, { name: 'sky' });
            } else {
              this.matrix.set(i, j, { name: 'ground' });
            }
        }
      }
    }
  }

  getGrid() {
    return this.matrix.grid;
  }

  getGridCoin() {
    return this.coinMatrix.grid;
  }
}
