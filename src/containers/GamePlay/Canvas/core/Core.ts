import { loadImage, SpriteResolver } from '@containers/GamePlay/Canvas';
import { Mario } from '@containers/GamePlay/Canvas/entity/Mario';
import { Timer } from './Timer';
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

  public canvasBg: HTMLCanvasElement;

  public canvasMario: HTMLCanvasElement;

  public contextBg: CanvasRenderingContext2D;

  public contextMario: CanvasRenderingContext2D;

  public sprite: SpriteResolver;

  public mario: Mario;

  constructor(canvasBg: HTMLCanvasElement, canvasMario: HTMLCanvasElement) {
    this.canvasBg = canvasBg;
    this.canvasMario = canvasMario;
    this.contextBg = this.canvasBg.getContext('2d') as CanvasRenderingContext2D;
    this.contextMario = this.canvasMario.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
  }

  init() {
    loadImage(spriteImage)
      .then((image) => {
        this.sprite = new SpriteResolver(image);
        this.drawGround();
        this.drawSky();
        this.drawMario();
      })
      .then(() => {
        this.timerMario();
      });
  }

  private timerMario() {
    const gravity = 1000;
    const timer = new Timer(1 / 60);

    timer.update = (deltaTime) => {
      this.contextMario.clearRect(
        0,
        0,
        this.canvasMario.width,
        this.canvasMario.height,
      );
      this.mario.update(deltaTime);
      this.mario.checkPosition();
      this.mario.vel.y += gravity * deltaTime;
      this.mario.draw();
    };

    timer.start();
  }

  private drawGround() {
    this.sprite.defineTile('ground', 0, 0);

    for (let i = groundRange.x1; i <= groundRange.x2; i += 1) {
      for (let j = groundRange.y1; j < groundRange.y2; j += 1) {
        this.sprite.drawTile('ground', this.contextBg, i, j);
      }
    }
  }

  private drawSky() {
    this.sprite.defineTile('sky', 1, 0);

    for (let i = skyRange.x1; i <= skyRange.x2; i += 1) {
      for (let j = skyRange.y1; j < skyRange.y2; j += 1) {
        this.sprite.drawTile('sky', this.contextBg, i, j);
      }
    }
  }

  private drawMario() {
    this.sprite.define('mario', 64, 0, 32, 32);
    this.mario = new Mario(this.sprite, this.contextMario);
  }
}
