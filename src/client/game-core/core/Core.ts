import { Level } from '@game-core/core/Level';
import {
  GAME_END,
  GAME_NEXT,
  GAME_RESTART,
  MODAL,
  loadImage,
} from '@game-core';
import { eventBus } from '@game-core/EventBus';
import { level1 } from '@game-core/levels/level-1';
import spriteImage from '@assets/images/sprite.png';

export class Core {
  public static _instance: Core;

  public canvasBg: HTMLCanvasElement;

  public canvasMario: HTMLCanvasElement;

  public score: number;

  public level: Level;

  public levelMap: {};

  public gameStatus: string;

  constructor(canvasBg: HTMLCanvasElement, canvasMario: HTMLCanvasElement) {
    this.canvasBg = canvasBg;
    this.canvasMario = canvasMario;

    eventBus.on(GAME_END, this.gameStatusHandler.bind(this));
    eventBus.on(GAME_RESTART, this.restartLevel.bind(this));
    eventBus.on(GAME_NEXT, this.startNextLevel.bind(this));

    loadImage(spriteImage)
      .then((image) => {
        this.level = new Level(this.canvasBg, this.canvasMario, image);
        this.loadLevel();
      })
      .then(() => {
        this.startGame(this.levelMap);
      });
  }

  loadLevel() {
    // TODO: здесь будет загрузчик уровней
    this.levelMap = level1;
  }

  startGame(level) {
    this.level.init(level);
  }

  calculateScore() {
    return Math.round((10 * this.level.coins) / (this.level.time / 60));
  }

  startNextLevel() {
    this.loadLevel();
    this.startGame(this.levelMap);
  }

  restartLevel() {
    this.startGame(this.levelMap);
  }

  gameStatusHandler(status) {
    this.score = status === 'win' ? this.calculateScore() : 0;
    eventBus.emit(MODAL, status, this.score);
    this.level.destroy();
  }
}
