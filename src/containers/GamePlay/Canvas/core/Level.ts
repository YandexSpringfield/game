import { Matrix } from '.';

interface ILevel {
  spriteSheet: string;
  backgrounds: { name: string; type: string; ranges: [number[]] }[];
}

export class Level {
  matrix: Matrix;

  level: ILevel;

  constructor(level) {
    this.level = level;
    this.matrix = new Matrix();

    this.setTilesMatrix();
  }

  getGrid() {
    return this.matrix.grid;
  }

  setTilesMatrix() {
    this.level.backgrounds.forEach((background) => {
      background.ranges.forEach((range) => {
        if (range.length === 4) {
          const [xStart, xLen, yStart, yLen] = range;
          this.applyRange(background, xStart, xLen, yStart, yLen);
        } else if (range.length === 3) {
          const [xStart, xLen, yStart] = range;
          this.applyRange(background, xStart, xLen, yStart, 1);
        } else if (range.length === 2) {
          const [xStart, yStart] = range;
          this.applyRange(background, xStart, 1, yStart, 1);
        }
      });
    });
  }

  applyRange(background, xStart, xLen, yStart, yLen) {
    const xEnd = xStart + xLen;
    const yEnd = yStart + yLen;
    for (let x = xStart; x < xEnd; x += 1) {
      for (let y = yStart; y < yEnd; y += 1) {
        this.matrix.set(x, y, {
          name: background.name,
          type: background.type,
        });
      }
    }
  }
}
