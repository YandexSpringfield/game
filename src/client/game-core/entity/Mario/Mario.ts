import { SpriteResolver, OverworldEntity } from '@game-core/sprite-resolver';
import { tileCollider } from '@game-core/collision/TileCollider';
import { KeyboardState, KEYS } from '@game-core/keyboardState';
import { musicPlayer } from '@game-core/core/MusicPlayer';
import { GAME_END, eventBus } from '@game-core';
import { Go, Jump } from '@game-core/traits';
import { Entity } from '@game-core/entity';

const INITIAL_POS = {
  column: 1,
  row: 11,
};

export class Mario extends Entity {
  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  keyboard: KeyboardState;

  go: Go;

  jump: Jump;

  levelSize: { ROWS: number; COLS: number };

  tileName: string;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    levelSize,
    ...rest: [SpriteResolver, {}]
  ) {
    super(rest, OverworldEntity.Mario);
    this.tileName = OverworldEntity.Mario;
    this.canvas = canvas;
    this.context = context;
    this.levelSize = levelSize;

    this.pos.set(
      INITIAL_POS.column * this.width,
      INITIAL_POS.row * this.height,
    );

    this.addTraits(new Jump(), new Go());
    this.keyboardSetup();
  }

  draw(cameraX, cameraY) {
    this.spriteResolver.draw(
      this.tileName,
      this.context,
      this.pos.x - cameraX,
      this.pos.y - cameraY,
    );
  }

  update(deltaTime) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.updateTraits(deltaTime);
    this.checkPosition(deltaTime);
  }

  keyboardSetup() {
    this.keyboard = new KeyboardState();

    this.keyboard.addKey(KEYS.SPACE, (keyState) => {
      if (keyState && !this.jump.cancel) {
        musicPlayer.playTrack('jump', false);
        this.jump.start();
        this.jump.cancel = true;
      } else {
        this.jump.stop();
      }
    });

    this.keyboard.addKey(KEYS.ARROW_RIGHT, (keyState) => {
      this.tileName = OverworldEntity.Mario;
      this.go.direction = keyState;
    });

    this.keyboard.addKey(KEYS.ARROW_LEFT, (keyState) => {
      this.tileName = OverworldEntity.MarioLeft;
      this.go.direction = -keyState;
    });

    this.keyboard.addListener(window);
  }

  keyboardRemove() {
    this.keyboard.removeListener(window);
  }

  checkPosition(deltaTime: number) {
    this.pos.x += this.vel.x * deltaTime;
    tileCollider.checkX(this, this.level);

    this.pos.y += this.vel.y * deltaTime;
    tileCollider.checkY(this, this.level);

    this.vel.y += this.gravity * deltaTime;

    if (this.pos.y + this.height >= this.canvas.height) {
      eventBus.emit(GAME_END, 'lost');
    }

    if (this.pos.x >= (this.levelSize.COLS - 1) * 32) {
      eventBus.emit(GAME_END, 'win');
    }
  }
}
