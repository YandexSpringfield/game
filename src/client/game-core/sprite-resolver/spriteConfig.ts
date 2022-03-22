export enum OverworldTiles {
  Ground = 'ground',
  Sky = 'sky',
  Bricks = 'bricks',
  Chocolate = 'chocolate',
  Chance = 'chance',
  Coin = 'coin',
}

export enum OverworldEntity {
  Mario = 'mario',
  MarioLeft = 'marioLeft',
  Goomba = 'goomba',
  GoombaRight = 'goombaRight',
  GoombaLeft = 'goombaLeft',
  GoombaKilled = 'goombaKilled',
}

interface IOverworld {
  tiles: { name: OverworldTiles; range: number[] }[];
  entities: { name: OverworldEntity; range: number[] }[];
}

interface ITilesSize {
  width: number;
  height: number;
}

export const tilesSize: ITilesSize = {
  width: 32,
  height: 32,
};

export const tilesTypes = {
  sky: { name: OverworldTiles.Sky },
  coin: { name: OverworldTiles.Coin, type: 'coin' },
  goomba: { name: OverworldEntity.Goomba, type: 'enemy' },
  ground: { name: OverworldTiles.Ground, type: 'ground' },
  bricks: { name: OverworldTiles.Bricks, type: 'ground' },
  chocolate: { name: OverworldTiles.Chocolate, type: 'ground' },
  chance: { name: OverworldTiles.Chance, type: 'ground' },
};

export const overworldSprite: IOverworld = {
  tiles: [
    { name: OverworldTiles.Ground, range: [0, 0] },
    { name: OverworldTiles.Sky, range: [1, 0] },
    { name: OverworldTiles.Bricks, range: [2, 0] },
    { name: OverworldTiles.Chocolate, range: [3, 0] },
    { name: OverworldTiles.Chance, range: [4, 0] },
    { name: OverworldTiles.Coin, range: [5, 0] },
  ],
  entities: [
    { name: OverworldEntity.Mario, range: [0, 1] },
    { name: OverworldEntity.MarioLeft, range: [1, 1] },
    { name: OverworldEntity.GoombaRight, range: [0, 2] },
    { name: OverworldEntity.GoombaLeft, range: [1, 2] },
    { name: OverworldEntity.GoombaKilled, range: [2, 2] },
  ],
};
