import { Level, musicPlayer } from '@game-core/core';
import {
  GAME_END,
  GAME_NEXT,
  GAME_RESTART,
  MODAL,
  loadImage,
  eventBus,
} from '@game-core';
import { level1, TLevel } from '@game-core/levels/level-1';
import spriteImage from '@assets/images/sprite.png';
import coin from '@assets/music/coin.ogg';
import jump from '@assets/music/jump.ogg';
import stomp from '@assets/music/stomp.ogg';
import lost from '@assets/music/thwomp.ogg';
import theme from '@assets/music/overworld.ogg';

export class Core {
  public static _instance: Core;

  public canvasBg: HTMLCanvasElement;

  public canvasMario: HTMLCanvasElement;

  public score: number;

  public level: Level;

  public levelMap: TLevel;

  public gameStatus: string;

  constructor(canvasBg: HTMLCanvasElement, canvasMario: HTMLCanvasElement) {
    this.canvasBg = canvasBg;
    this.canvasMario = canvasMario;
    this.addAudio();

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
    this.loadLevel();
    this.startGame(this.levelMap);
  }

  gameStatusHandler(status) {
    this.level.destroy();
    if (status === 'win') {
      this.score = this.calculateScore();
    } else {
      musicPlayer.playTrack('lost', false);
      this.score = 0;
    }
    setTimeout(() => {
      eventBus.emit(MODAL, status, this.score);
    }, 100);
  }

  addAudio() {
    musicPlayer.addTrack('coin', coin);
    musicPlayer.addTrack('jump', jump);
    musicPlayer.addTrack('lost', lost);
    musicPlayer.addTrack('stomp', stomp);
    musicPlayer.addTrack('theme', theme);
  }
}
