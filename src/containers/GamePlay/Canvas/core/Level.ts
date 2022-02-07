import { Matrix } from '.';

const ROWS = 14;
const COLS = 150;

const obj = {
  '2.9': 'ground',
  '3.9': 'chance',
  '4.9': 'coin',
};

export class Level {
  matrix: Matrix;

  coinMatrix: Matrix;

  constructor() {
    this.matrix = new Matrix();
    this.coinMatrix = new Matrix();

    for (let i = 0; i <= COLS; i += 1) {
      for (let j = 0; j <= ROWS; j += 1) {
        const element = obj[`${i}.${j}`];

        switch (element) {
          case 'ground':
            this.matrix.set(i, j, { name: 'ground' });
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
