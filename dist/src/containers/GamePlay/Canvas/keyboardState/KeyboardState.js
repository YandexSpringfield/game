export class KeyboardState {
    constructor() {
        this.handleEvent = (e) => {
            var _a;
            const { keyCode } = e;
            if (this.keyMap.has(keyCode)) {
                e.preventDefault();
                const keyState = e.type === 'keydown' ? 1 : 0;
                if (this.keyState.get(keyCode) === keyState) {
                    return;
                }
                this.keyState.set(keyCode, keyState);
                (_a = this.keyMap.get(keyCode)) === null || _a === void 0 ? void 0 : _a(keyState);
            }
        };
        this.keyState = new Map();
        this.keyMap = new Map();
    }
    addKey(keyCode, cb) {
        this.keyMap.set(keyCode, cb);
    }
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
