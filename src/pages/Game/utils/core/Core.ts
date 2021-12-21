/* eslint-disable no-plusplus */
import { loadImage, SpriteResolver } from '@pages/Game/utils';
import spriteImage from '@/assets/images/sprite.png';

const skyRange = [[0, 20, 0, 18]];
const groundRange = [[0, 20, 18, 20]];

/* eslint-disable no-constructor-return */
export class Core {
  public static _instance: Core;

  public canvas: HTMLCanvasElement;

  public context: CanvasRenderingContext2D;

  public spriteImage: HTMLImageElement | null;

  constructor(canvas: HTMLCanvasElement) {
    if (Core._instance) {
      return this;
    }

    Core._instance = this;
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    this.spriteImage = null;
  }

  init() {
    this.drawBackgrounds();
    this.drawMario();
  }

  private drawBackgrounds() {
    loadImage(spriteImage).then((image) => {
      this.spriteImage = image;

      const sprites = new SpriteResolver(this.spriteImage);
      sprites.defineTile('ground', 0, 0);
      sprites.defineTile('sky', 1, 0);

      groundRange.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
          for (let y = y1; y < y2; ++y) {
            sprites.drawTile('ground', this.context, x, y);
          }
        }
      });

      skyRange.forEach(([x1, x2, y1, y2]) => {
        for (let x = x1; x < x2; ++x) {
          for (let y = y1; y < y2; ++y) {
            sprites.drawTile('sky', this.context, x, y);
          }
        }
      });

      this.drawMario();
    });
  }

  private drawMario() {
    if (this.spriteImage) {
      const sprites = new SpriteResolver(this.spriteImage);
      sprites.define('mario', 64, 0, 32, 32);
      sprites.draw('mario', this.context, 32, 544);
    }
  }
}
