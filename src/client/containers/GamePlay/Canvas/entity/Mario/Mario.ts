import { Entity } from 'src/client/containers/GamePlay/Canvas/entity/index';
import {
  KeyboardState,
  KEYS,
} from 'src/client/containers/GamePlay/Canvas/keyboardState';
import { SpriteResolver } from 'src/client/containers/GamePlay/index';
import { Go, Jump } from 'src/client/containers/GamePlay/Canvas/traits';
import { Matrix } from 'src/client/containers/GamePlay/Canvas/core';
import { EntityName } from 'src/client/containers/GamePlay/Canvas/sprite-resolver/spriteConfig';

const INITIAL_POS = {
  column: 1,
  row: 11,
};

export class Mario extends Entity {
  canvas: HTMLCanvasElement;

  sprite: SpriteResolver;

  context: CanvasRenderingContext2D;

  keyboard: KeyboardState;

  go: Go;

  jump: Jump;

  constructor(
    canvas: HTMLCanvasElement,
    sprite: SpriteResolver,
    context: CanvasRenderingContext2D,
    matrix: Matrix,
    coinMatrix: Matrix,
  ) {
    super(matrix, coinMatrix, sprite);
    this.canvas = canvas;
    this.sprite = sprite;
    this.context = context;

    this.addTraits(new Jump(), new Go());
    this.keyboardSetup();

    this.pos.set(
      INITIAL_POS.column * this.width,
      INITIAL_POS.row * this.height,
    );
  }

  draw(cameraX, cameraY) {
    this.sprite.draw(
      EntityName.Mario,
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
    this.tileCollider.checkX(this);

    this.pos.y += this.vel.y * deltaTime;
    this.tileCollider.checkY(this);

    this.vel.y += this.gravity * deltaTime;
  }
}
