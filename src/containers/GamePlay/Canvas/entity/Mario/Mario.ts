import { Entity } from '@containers/GamePlay/Canvas/entity';
import { KeyboardState, KEYS } from '@containers/GamePlay/Canvas/keyboardState';
import { SpriteResolver } from '@containers/GamePlay';
import { Go, Jump } from '@containers/GamePlay/Canvas/traits';

const INITIAL_POS = {
  column: 1,
  row: 11,
};

export class Mario extends Entity {
  canvas: HTMLCanvasElement;

  sprite: SpriteResolver;

  context: CanvasRenderingContext2D;

  go: Go;

  jump: Jump;

  constructor(canvas, sprite, context, matrix) {
    super(matrix);
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
      'mario',
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
    const keyboard = new KeyboardState();

    keyboard.addKey(KEYS.SPACE, (keyState) => {
      if (keyState && !this.jump.cancel) {
        this.jump.start();
        this.jump.cancel = true;
      } else {
        this.jump.stop();
      }
    });

    keyboard.addKey(KEYS.ARROW_RIGHT, (keyState) => {
      this.go.direction = keyState;
    });

    keyboard.addKey(KEYS.ARROW_LEFT, (keyState) => {
      this.go.direction = -keyState;
    });

    keyboard.addListener(window);
  }

  checkPosition(deltaTime: number) {
    if (this.pos.y - this.height > 448) {
      this.pos.x = INITIAL_POS.column * this.width;
      this.pos.y = 0;
    } else {
      this.pos.x += this.vel.x * deltaTime;
      this.tileCollider.checkX(this);

      this.pos.y += this.vel.y * deltaTime;
      this.tileCollider.checkY(this);

      this.vel.y += this.gravity * deltaTime;
    }
  }
}
