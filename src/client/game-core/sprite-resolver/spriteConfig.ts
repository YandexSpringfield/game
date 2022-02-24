export enum OverworldName {
  Ground = 'ground',
  Sky = 'sky',
  Bricks = 'bricks',
  Chocolate = 'chocolate',
  Chance = 'chance',
  Coin = 'coin',
}

export enum EntityName {
  Mario = 'mario',
}

interface IOverworld {
  tiles: { name: OverworldName; range: number[] }[];
  entities: { name: EntityName; range: number[] }[];
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
  sky: { name: OverworldName.Sky },
  coin: { name: OverworldName.Coin },
  ground: { name: OverworldName.Ground, type: 'ground' },
  bricks: { name: OverworldName.Bricks, type: 'ground' },
  chocolate: { name: OverworldName.Chocolate, type: 'ground' },
  chance: { name: OverworldName.Chance, type: 'ground' },
};

export const overworldSprite: IOverworld = {
  tiles: [
    { name: OverworldName.Ground, range: [0, 0] },
    { name: OverworldName.Sky, range: [1, 0] },
    { name: OverworldName.Bricks, range: [3, 0] },
    { name: OverworldName.Chocolate, range: [4, 0] },
    { name: OverworldName.Chance, range: [5, 0] },
    { name: OverworldName.Coin, range: [6, 0] },
  ],
  entities: [{ name: EntityName.Mario, range: [2, 0] }],
};