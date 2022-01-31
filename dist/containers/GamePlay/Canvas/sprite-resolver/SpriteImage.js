import { tilesSize } from './spriteConfig';
export class SpriteResolver {
    constructor(image, spritesConfig) {
        this.image = image;
        this.config = spritesConfig;
        this.width = tilesSize.width;
        this.height = tilesSize.height;
        this.tiles = new Map();
        this.init();
    }
    init() {
        this.defineTiles();
        this.defineEntities();
    }
    defineTiles() {
        this.config.tiles.forEach((tile) => {
            const x = tile.range[0];
            const y = tile.range[1];
            this.define(tile.name, x * this.width, y * this.height);
        });
    }
    defineEntities() {
        this.config.entities.forEach((entity) => {
            const x = entity.range[0];
            const y = entity.range[1];
            this.define(entity.name, x * this.width, y * this.height);
        });
    }
    define(name, x, y) {
        var _a;
        const buffer = document.createElement('canvas');
        buffer.width = this.width;
        buffer.height = this.height;
        (_a = buffer
            .getContext('2d')) === null || _a === void 0 ? void 0 : _a.drawImage(this.image, x, y, this.width, this.height, 0, 0, this.width, this.height);
        this.tiles.set(name, buffer);
    }
    draw(name, context, x, y) {
        const buffer = this.tiles.get(name);
        if (buffer) {
            context.drawImage(buffer, x, y);
        }
    }
    drawTile(name, context, x, y) {
        this.draw(name, context, x * this.width, y * this.height);
    }
}
