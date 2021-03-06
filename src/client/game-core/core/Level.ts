import {
  Camera,
  Timer,
  musicPlayer,
  drawCoinsStatus,
  drawTimerStatus,
} from '@game-core/core';
import { Mario, Goomba, EntityEvents } from '@game-core/entity';
import {
  overworldSprite,
  tilesSize,
  OverworldTiles,
} from '@game-core/sprite-resolver';
import { tileCollider } from '@game-core/collision/TileCollider';
import { SpriteResolver, eventBus } from '@game-core';
import { TLevel } from '@game-core/levels';
import cloneDeep from '@utils/utils';

export class Level {
  public canvasBg: HTMLCanvasElement;

  public canvasMario: HTMLCanvasElement;

  public contextBg: CanvasRenderingContext2D;

  public contextMario: CanvasRenderingContext2D;

  public mario: Mario;

  public goomba: Goomba;

  public camera: Camera;

  public timer: Timer;

  public sprite: SpriteResolver;

  public level: TLevel;

  public time: number;

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
      musicPlayer.playTrack('coin', false);
    });

    this.levelSize = {
      ROWS: 14,
      COLS: 150,
    };
  }

  init(level) {
    musicPlayer.playTrack('theme', true);

    this.coins = 0;
    this.level = cloneDeep(level);
    this.camera = new Camera();
    this.timer = new Timer();
    this.mario = new Mario(
      this.canvasMario,
      this.contextMario,
      this.levelSize,
      this.sprite,
      this.level,
    );
    this.goomba = new Goomba(
      this.canvasMario,
      this.contextMario,
      this.levelSize,
      this.level.goomba.initial,
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
        const element = this.level.tiles[`${x}.${y}`];

        if (element) {
          if (element === OverworldTiles.Coin) {
            this.sprite.drawTile(
              OverworldTiles.Sky,
              this.contextBg,
              x - start,
              y,
            );
          }
          this.sprite.drawTile(element, this.contextBg, x - start, y);
        } else {
          const tile =
            y <= this.levelSize.ROWS - 2
              ? OverworldTiles.Sky
              : OverworldTiles.Ground;
          this.sprite.drawTile(tile, this.contextBg, x - start, y);
        }
      }
    }
  }

  timerStart() {
    this.timer.update = (deltaTime, time, animateTime) => {
      this.time = time;
      this.mario.update(deltaTime);
      this.goomba.update(deltaTime, animateTime);

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
      this.goomba.draw(this.camera.pos.x, this.camera.pos.y);

      drawTimerStatus(this.contextMario, this.canvasMario, time);
      drawCoinsStatus(this.contextMario, this.canvasMario, this.coins);
    };

    this.timer.start();
  }

  deleteCoin(x, y) {
    this.level.tiles[`${x}.${y}`] = OverworldTiles.Sky;
    this.coins += 1;
  }

  destroy() {
    musicPlayer.stopTracks();
    this.timer.stop();
    this.mario.keyboardRemove();
  }
}
