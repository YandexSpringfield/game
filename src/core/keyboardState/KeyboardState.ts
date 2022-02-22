export class KeyboardState {
  keyState: Map<number, number>;

  keyMap: Map<number, (s: number) => {}>;

  constructor() {
    this.keyState = new Map();
    this.keyMap = new Map();
  }

  addKey(keyCode, cb) {
    this.keyMap.set(keyCode, cb);
  }

  handleEvent = (e) => {
    const { keyCode } = e;

    if (this.keyMap.has(keyCode)) {
      e.preventDefault();

      const keyState = e.type === 'keydown' ? 1 : 0;

      if (this.keyState.get(keyCode) === keyState) {
        return;
      }

      this.keyState.set(keyCode, keyState);
      this.keyMap.get(keyCode)?.(keyState);
    }
  };

  addListener(canvas) {
    const eventNames = ['keydown', 'keyup'];

    eventNames.forEach((eventName) => {
      canvas.addEventListener(eventName, this.handleEvent);
    });
  }

  removeListener(canvas) {
    const eventNames = ['keydown', 'keyup'];

    eventNames.forEach((eventName) => {
      canvas.removeEventListener(eventName, this.handleEvent);
    });
  }
}
