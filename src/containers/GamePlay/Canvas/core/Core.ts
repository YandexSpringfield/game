import {
  overworldSprite,
  tilesSize,
} from '@containers/GamePlay/Canvas/sprite-resolver';
import { loadImage, SpriteResolver } from '@containers/GamePlay/Canvas';
import { Camera } from '@containers/GamePlay/Canvas/core/Camera';
import { Mario } from '@containers/GamePlay/Canvas/entity/Mario';
import level from '@/assets/levels/1-1.json';
import spriteImage from '@/assets/images/sprite.png';
import { Timer } from './Timer';
import { Level } from './Level';

export class Core {
  public static _instance: Core;

  public canvasBg: HTMLCanvasElement;

  public canvasMario: HTMLCanvasElement;

  public contextBg: CanvasRenderingContext2D;

  public contextMario: CanvasRenderingContext2D;

  public sprite: SpriteResolver;

  public mario: Mario;

  public level: Level;

  public camera: Camera;

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
        this.sprite = new SpriteResolver(image, overworldSprite);
        this.level = new Level(level);
        this.camera = new Camera();
        this.mario = new Mario(
          this.canvasMario,
          this.sprite,
          this.contextMario,
          this.level.matrix,
        );
      })
      .then(() => {
        this.drawTiles(0, Math.floor(this.canvasBg.width / tilesSize.width));
        this.timer();
      });
  }

  private timer() {
    const timer = new Timer(1 / 60);

    timer.update = (deltaTime) => {
      this.mario.update(deltaTime);

      this.updateBackground();

      if (this.mario.pos.x > 300) {
        this.camera.pos.x = this.mario.pos.x - 300;
      }

      if (this.mario.pos.x === 32) {
        this.camera.pos.x = 0;
      }

      this.mario.draw(this.camera.pos.x, this.camera.pos.y);
    };

    timer.start();
  }

  updateBackground() {
    const converter = this.mario.tileCollider;

    const drawWidth = converter.toIndex(this.camera.size.x);
    const drawFrom = converter.toIndex(this.camera.pos.x);

    const drawTo = drawFrom + drawWidth;

    this.drawTiles(drawFrom, drawTo);

    this.contextBg.drawImage(
      this.canvasBg,
      -this.camera.pos.x % tilesSize.width,
      -this.camera.pos.y,
    );
  }

  drawTiles(start, end) {
    for (let x = start; x <= end; x += 1) {
      const col = this.level.getGrid()[x];
      if (col) {
        col.forEach((tile, y) => {
          this.sprite.drawTile(tile.name, this.contextBg, x - start, y);
        });
      }
    }
  }
}
