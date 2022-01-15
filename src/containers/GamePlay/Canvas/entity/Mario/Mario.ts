import { Entity } from '@containers/GamePlay/Canvas/entity';
import { KeyboardState, KEYS } from '@containers/GamePlay/Canvas/keyboardState';
import { SpriteResolver } from '@containers/GamePlay';
import { Go, Jump, Velocity } from '@containers/GamePlay/Canvas/traits';

const INITIAL_POS = {
  x: 32,
  y: 544,
};

export class Mario extends Entity {
  sprite: SpriteResolver;

  context: CanvasRenderingContext2D;

  go: Go;

  jump: Jump;

  constructor(sprite, context) {
    super();
    this.sprite = sprite;
    this.context = context;

    this.addTraits(new Velocity(), new Jump(), new Go());
    this.keyboardSetup();
    this.pos.set(INITIAL_POS.x, INITIAL_POS.y);
  }

  draw() {
    this.sprite.draw('mario', this.context, this.pos.x, this.pos.y);
  }

  keyboardSetup() {
    const keyboard = new KeyboardState();

    keyboard.addKey(KEYS.SPACE, (keyState) => {
      if (keyState && this.pos.y === INITIAL_POS.y) {
        this.jump.start();
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

  checkPosition() {
    if (this.pos.y > INITIAL_POS.y) {
      this.pos.y = INITIAL_POS.y;
    }
    if (this.pos.x < 0) {
      this.pos.x = 0;
    }
  }
}
