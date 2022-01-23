import { Vectors } from '@containers/GamePlay/Canvas/entity/Vectors';

export class Camera {
  pos: Vectors;

  size: Vectors;

  constructor() {
    this.pos = new Vectors(0, 0);
    this.size = new Vectors(1280, 640);
  }
}
