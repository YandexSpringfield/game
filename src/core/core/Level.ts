import { Camera } from '@core/core/Camera';
import { Mario } from '@core/entity';
import { Timer } from '@core/core/Timer';
import { overworldSprite, tilesSize } from '@core/sprite-resolver';
import { EntityEvents } from '@core/entity/Entity';
import { eventBus } from '@core/EventBus';
import { tileCollider } from '@core/collision/TileCollider';
import { drawCoinsStatus, drawTimerStatus } from '@core/core/drawText';
import { SpriteResolver } from '@core';

export class Level {
  public canvasBg: HTMLCanvasElement;

  public canvasMario: HTMLCanvasElement;

  public contextBg: CanvasRenderingContext2D;

  public contextMario: CanvasRenderingContext2D;

  public mario: Mario;

  public camera: Camera;

  public timer: Timer;

  public sprite: SpriteResolver;

  public time: number;

  public level: {};

  public coins: number;

  public ROWS: number;

  public COLS: number;

  constructor(canvasBg, canvasMario, image) {
    this.canvasBg = canvasBg;
    this.canvasMario = canvasMario;
    this.contextBg = this.canvasBg.getContext('2d') as CanvasRenderingContext2D;
    this.contextMario = this.canvasMario.getContext(
      '2d',
    ) as CanvasRenderingContext2D;
    this.sprite = new SpriteResolver(image, overworldSprite);

    eventBus.on(EntityEvents.selectCoin, (indexX, indexY) => {
      this.deleteCoin(indexX, indexY);
      this.updateBackground();
    });

    // TODO: менять размер при ресайзе (?)
    this.ROWS = 14;
    this.COLS = 150;
  }

  init(level) {
    this.coins = 0;
    this.level = { ...level };
    this.camera = new Camera();
    this.timer = new Timer();
    this.mario = new Mario(
      this.canvasMario,
      this.contextMario,
      this.sprite,
      this.level,
    );

    this.drawLevel(0, Math.floor(this.canvasBg.width / tilesSize.width));
    this.timerStart();
  }

  updateBackground() {
    const start = tileCollider.toIndex(this.camera.pos.x);
    const end = tileCollider.toIndex(this.camera.size.x) + start;

    this.drawLevel(start, end);

    this.contextBg.drawImage(
      this.canvasBg,
      -this.camera.pos.x % tilesSize.width,
      -this.camera.pos.y,
    );
  }

  drawLevel(start, end) {
    for (let x = start; x <= end; x += 1) {
      for (let y = 0; y <= 14; y += 1) {
        const element = this.level[`${x}.${y}`];

        if (element) {
          if (element === 'coin') {
            this.sprite.drawTile('sky', this.contextBg, x - start, y);
          }
          this.sprite.drawTile(element, this.contextBg, x - start, y);
        } else {
          const tile = y <= 14 - 2 ? 'sky' : 'ground';
          this.sprite.drawTile(tile, this.contextBg, x - start, y);
        }
      }
    }
  }

  timerStart() {
    this.timer.update = (deltaTime, time) => {
      this.time = time;
      this.mario.update(deltaTime);

      if (
        this.mario.vel.x !== 0 &&
        this.mario.pos.x > 300 &&
        this.camera.pos.x + this.canvasBg.width < this.COLS * tilesSize.width
      ) {
        this.camera.pos.x = this.mario.pos.x - 300;
        this.updateBackground();
      }

      this.mario.draw(this.camera.pos.x, this.camera.pos.y);

      drawTimerStatus(this.contextMario, this.canvasMario, time);
      drawCoinsStatus(this.contextMario, this.canvasMario, this.coins);
    };

    this.timer.start();
  }

  deleteCoin(x, y) {
    this.level[`${x}.${y}`] = 'sky';
    this.coins += 1;
  }

  destroy() {
    this.timer.stop();
    this.mario.keyboardRemove();
  }
}
