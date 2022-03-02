import { Entity } from '@game-core/entity';
import { Go } from '@game-core/traits';
import { SpriteResolver } from '@game-core';
import { tileCollider } from '@game-core/collision';
import { eventBus } from '@game-core/EventBus';

export class Goomba extends Entity {
  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  direction: number;

  go: Go;

  levelSize: { ROWS: number; COLS: number };

  tileName: string;

  time: number;

  initialPos: { column: number; row: number };

  constructor(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    levelSize,
    initialPos,
    ...rest: [SpriteResolver, {}]
  ) {
    super(rest, 'goomba');
    this.tileName = 'goombaRight';
    this.initialPos = initialPos;
    this.canvas = canvas;
    this.context = context;
    this.levelSize = levelSize;
    this.direction = 1;

    this.pos.set(
      this.initialPos.column * this.width,
      this.initialPos.row * this.height,
    );

    this.addTraits(new Go(5000));

    eventBus.on('kill', this.killed.bind(this));
  }

  killed() {
    this.tileName = 'goombaKilled';
    this.level.goomba.pos = [];
    this.update = () => null;

    setTimeout(() => {
      this.pos.set(-100, -100);
    }, 1000);
  }

  draw(cameraX, cameraY) {
    this.spriteResolver.draw(
      this.tileName,
      this.context,
      this.pos.x - cameraX,
      this.pos.y - cameraY,
    );
  }

  update(deltaTime, time) {
    if (time !== this.time) {
      this.tileName =
        this.tileName === 'goombaRight' ? 'goombaLeft' : 'goombaRight';
    }
    this.time = time;
    this.level.goomba.pos = [
      Math.floor(this.pos.x / 32),
      Math.floor(this.pos.y / 32),
    ];
    this.go.direction = this.direction;
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.updateTraits(deltaTime);
    this.checkPosition(deltaTime);
  }

  checkPosition(deltaTime: number) {
    this.pos.x += this.vel.x * deltaTime;
    tileCollider.checkX(this, this.level);

    this.pos.y += this.vel.y * deltaTime;
    tileCollider.checkY(this, this.level);

    this.vel.y += this.gravity * deltaTime;

    if (this.pos.y + this.height >= this.canvas.height) {
      this.pos.set(
        this.initialPos.column * this.width,
        this.initialPos.row * this.height,
      );
      this.direction *= -1;
    }
  }
}
