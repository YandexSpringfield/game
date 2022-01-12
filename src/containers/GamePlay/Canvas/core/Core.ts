import { loadImage, SpriteResolver } from '@containers/GamePlay/Canvas';
import spriteImage from '@/assets/images/sprite.png';

const groundRange = {
  x1: 0,
  x2: 40,
  y1: 18,
  y2: 20,
};

const skyRange = {
  x1: 0,
  x2: 40,
  y1: 0,
  y2: 18,
};

export class Core {
  public static _instance: Core;

  public canvas: HTMLCanvasElement;

  public context: CanvasRenderingContext2D;

  public sprite: SpriteResolver;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }

  init() {
    loadImage(spriteImage).then((image) => {
      this.sprite = new SpriteResolver(image);
      this.drawGround();
      this.drawSky();
      this.drawMario();
    });
  }

  private drawGround() {
    this.sprite.defineTile('ground', 0, 0);

    for (let i = groundRange.x1; i <= groundRange.x2; i += 1) {
      for (let j = groundRange.y1; j < groundRange.y2; j += 1) {
        this.sprite.drawTile('ground', this.context, i, j);
      }
    }
  }

  private drawSky() {
    this.sprite.defineTile('sky', 1, 0);

    for (let i = skyRange.x1; i <= skyRange.x2; i += 1) {
      for (let j = skyRange.y1; j < skyRange.y2; j += 1) {
        this.sprite.drawTile('sky', this.context, i, j);
      }
    }
  }

  private drawMario() {
    this.sprite.define('mario', 64, 0, 32, 32);
    this.sprite.draw('mario', this.context, 32, 544);
  }
}
