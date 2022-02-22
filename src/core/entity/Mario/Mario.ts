import { tileCollider } from '@core/collision/TileCollider';
import { GAME_END, SpriteResolver } from '@core';
import { KeyboardState, KEYS } from '@core/keyboardState';
import { Go, Jump } from '@core/traits';
import { Entity } from '@core/entity';
import { eventBus } from '@core/EventBus';

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

  name: string;

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    ...rest: [SpriteResolver, {}]
  ) {
    super(rest);
    this.name = 'mario';
    this.canvas = canvas;
    this.context = context;

    this.pos.set(
      INITIAL_POS.column * this.width,
      INITIAL_POS.row * this.height,
    );

    this.addTraits(new Jump(), new Go());
    this.keyboardSetup();
  }

  draw(cameraX, cameraY) {
    this.spriteResolver.draw(
      this.name,
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
        this.jump.start();
        this.jump.cancel = true;
      } else {
        this.jump.stop();
      }
    });

    this.keyboard.addKey(KEYS.ARROW_RIGHT, (keyState) => {
      this.go.direction = keyState;
    });

    this.keyboard.addKey(KEYS.ARROW_LEFT, (keyState) => {
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

    // TODO: изменить проверку
    if (this.pos.x >= 149 * 32) {
      eventBus.emit(GAME_END, 'win');
    }
  }
}