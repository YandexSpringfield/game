interface IOverworld {
  tiles: { name: string; range: number[] }[];
  entities: { name: string; range: number[] }[];
}

interface ITilesSize {
  width: number;
  height: number;
}

export const tilesSize: ITilesSize = {
  width: 32,
  height: 32,
};

export const overworldSprite: IOverworld = {
  tiles: [
    { name: 'ground', range: [0, 0] },
    { name: 'sky', range: [1, 0] },
    { name: 'bricks', range: [3, 0] },
    { name: 'chocolate', range: [4, 0] },
    { name: 'chance', range: [5, 0] },
  ],
  entities: [{ name: 'mario', range: [2, 0] }],
};
