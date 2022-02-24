import { Camera } from '@game-core/core/Camera';
import { Mario } from '@game-core/entity';
import { Timer } from '@game-core/core/Timer';
import { overworldSprite, tilesSize } from '@game-core/sprite-resolver';
import { EntityEvents } from '@game-core/entity/Entity';
import { eventBus } from '@game-core/EventBus';
import { tileCollider } from '@game-core/collision/TileCollider';
import { drawCoinsStatus, drawTimerStatus } from '@game-core/core/drawText';
import { SpriteResolver } from '@game-core';

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

  public levelSize: { ROWS: number; COLS: number };

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

    this.levelSize = {
      ROWS: 14,
      COLS: 150,
    };
  }

  init(level) {
    this.coins = 0;
    this.level = { ...level };
    this.camera = new Camera();
    this.timer = new Timer();
    this.mario = new Mario(
      this.canvasMario,
      this.contextMario,
      this.levelSize,
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
      for (let y = 0; y <= this.levelSize.ROWS; y += 1) {
        const element = this.level[`${x}.${y}`];

        if (element) {
          if (element === 'coin') {
            this.sprite.drawTile('sky', this.contextBg, x - start, y);
          }
          this.sprite.drawTile(element, this.contextBg, x - start, y);
        } else {
          const tile = y <= this.levelSize.ROWS - 2 ? 'sky' : 'ground';
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
        this.camera.pos.x + this.canvasBg.width <
          this.levelSize.COLS * tilesSize.width
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
