export type TEnemy = {
  initial: { column: number; row: number };
  pos: [] | [number, number];
};
export type TTails = { [index: string]: string };
export type TLevel = { tiles: TTails; goomba: TEnemy };
