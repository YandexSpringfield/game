import { random, middle } from '@utils/utils';
import { Matrix } from '.';

const ROWS = 14;
const COLS = 150;

const STEP = 10;
const ITERATIONS = COLS / STEP;

const GAP_START = 5;
const GAP_SHIFT = 2;
const MIN_GAP_LEN = 1;
const MAX_GAP_LEN = 3;

const BRICKS_START = 3;
const BRICKS_SHIFT = 2;
const MIN_BRICKS_LEN = 1;
const MAX_BRICKS_LEN = 4;
const MIN_BRICKS_Y = 9;
const MAX_BRICKS_Y = 2;

export class Level {
  matrix: Matrix;

  constructor() {
    this.matrix = new Matrix();

    this.setBackground();
    this.setPatterns();
  }

  getGrid() {
    return this.matrix.grid;
  }

  setBackground() {
    for (let i = 0; i <= COLS; i += 1) {
      for (let j = 0; j <= ROWS; j += 1) {
        if (j <= ROWS - 2) {
          this.matrix.set(i, j, { name: 'sky' });
        } else {
          this.matrix.set(i, j, { name: 'ground', type: 'ground' });
        }
      }
    }
  }

  setPatterns() {
    let step = 0;

    for (let i = 0; i < ITERATIONS; i += 1) {
      if ((step / 10) % 2 === 0) {
        this.setBricks(step);
      } else {
        this.setGaps(step);
      }

      step += STEP;
    }
  }

  setGaps(step) {
    const value = { name: 'sky' };
    const range: number[] = [];

    const x = random(GAP_START, GAP_SHIFT) + step;
    let xLen = random(MAX_GAP_LEN, MIN_GAP_LEN);

    while (xLen >= 0) {
      this.matrix.set(x + xLen, 13, value);
      this.matrix.set(x + xLen, 14, value);

      range.push(x + xLen);
      xLen -= 1;
    }

    if (range.length > 1 && random()) {
      this.setChocolate(x, range.length);
    } else if (range.length > 3) {
      this.setBricks(step, x, 3);
    }
  }

  setChocolate(x, len) {
    const value = { name: 'chocolate', type: 'ground' };
    const y = 12;

    this.matrix.set(x - 2, y, value);
    this.matrix.set(x - 1, y, value);
    this.matrix.set(x - 1, y - 1, value);

    if (random()) {
      this.matrix.set(x + len, y, value);
      this.matrix.set(x + len, y - 1, value);
      this.matrix.set(x + len + 1, y, value);
    }
  }

  setBricks(step, start?, len?) {
    let x;
    let y;
    let xLen;

    const name = random() ? 'ground' : 'bricks';
    const value = { name, type: 'ground' };

    if (start && len) {
      x = start;
      xLen = len;
    } else {
      x = random(BRICKS_START, BRICKS_SHIFT) + step;
      y = random(MAX_BRICKS_Y, MIN_BRICKS_Y);
      xLen = random(MAX_BRICKS_LEN, MIN_BRICKS_LEN);
    }

    const chance = xLen % 2 === 0 ? middle(x, xLen) : -1;
    const double = random();

    while (xLen >= 0) {
      if (double) {
        this.matrix.set(x + xLen, y, value);
        this.matrix.set(x + xLen, y - 4, value);
        if (x + xLen === chance) {
          this.matrix.set(x + xLen, y - 4, { name: 'chance', type: 'ground' });
        }
      } else {
        this.matrix.set(x + xLen, y, value);
        if (x + xLen === chance) {
          this.matrix.set(x + xLen, y - 4, { name: 'chance', type: 'ground' });
        }
      }

      xLen -= 1;
    }
  }
}
