import {
  overworldSprite,
  tilesSize,
} from '@containers/GamePlay/Canvas/sprite-resolver';
import { loadImage, SpriteResolver } from '@containers/GamePlay/Canvas';
import { Camera } from '@containers/GamePlay/Canvas/core/Camera';
import { Mario } from '@containers/GamePlay/Canvas/entity/Mario';
import { KEYS } from '@containers/GamePlay/Canvas/keyboardState';
import level1 from '@/assets/levels/1-1.json';
import level2 from '@/assets/levels/1-2.json';
import spriteImage from '@/assets/images/sprite.png';
import { Timer } from './Timer';
import { Level } from './Level';

const GAME = {
  win: 'Вы прошли уровень!',
  lost: 'Начать заново?',
};

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

  public timer: Timer;

  gameStatus: string;

  constructor(canvasBg: HTMLCanvasElement, canvasMario: HTMLCanvasElement) {
    this.canvasBg = canvasBg;
    this.canvasMario = canvasMario;
    this.contextBg = this.canvasBg.getContext('2d') as CanvasRenderingContext2D;
    this.contextMario = this.canvasMario.getContext(
      '2d',
    ) as CanvasRenderingContext2D;

    this.init(level1);
  }

  init(level) {
    loadImage(spriteImage)
      .then((image) => {
        this.timer = new Timer();
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
        this.timerStart();
      });
  }

  startGame() {
    window.removeEventListener('keypress', this.restartHandler);

    this.mario.pos.set(32, 0);
    this.camera.pos.set(0, 0);
    this.updateBackground();

    this.timerStart();
  }

  startNextLevel() {
    this.mario.keyboardRemove();
    window.removeEventListener('keypress', this.restartHandler);

    this.init(level2);
  }

  private timerStart() {
    this.timer.update = (deltaTime) => {
      this.mario.update(deltaTime);

      if (
        this.mario.vel.x !== 0 &&
        this.mario.pos.x > 300 &&
        this.camera.pos.x + this.canvasBg.width <
          this.level.getGrid().length * tilesSize.width
      ) {
        this.camera.pos.x = this.mario.pos.x - 300;
        this.updateBackground();
      }

      if (this.mario.pos.y > this.canvasBg.height) {
        this.gameRestart('lost');
      }

      if (this.mario.pos.x > (this.level.getGrid().length - 1) * 32) {
        this.gameRestart('win');
      }

      this.mario.draw(this.camera.pos.x, this.camera.pos.y);
    };

    this.timer.start();
  }

  updateBackground() {
    const converter = this.mario.tileCollider;

    const start = converter.toIndex(this.camera.pos.x);
    const end = converter.toIndex(this.camera.size.x) + start;

    this.drawTiles(start, end);

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

  gameRestart(status) {
    this.gameStatus = status;

    this.timer.stop();
    this.drawStartText(GAME[status]);

    window.addEventListener('keypress', this.restartHandler);
  }

  restartHandler = (e) => {
    e.preventDefault();
    if (e.charCode === KEYS.ENTER) {
      if (this.gameStatus === 'win') {
        this.startNextLevel();
      } else {
        this.startGame();
      }
    }
  };

  drawStartText(text) {
    this.contextBg.font = 'bold 70px Roboto';
    this.contextBg.fillStyle = '#fff';
    this.contextBg.textAlign = 'center';
    this.contextBg.fillText(
      text,
      this.canvasBg.width / 2,
      this.canvasBg.height / 2,
    );
    this.contextBg.font = '30px Roboto';
    this.contextBg.fillText(
      '(нажмите ↵ / Enter)',
      this.canvasBg.width / 2,
      this.canvasBg.height / 2 + 50,
    );
  }
}
