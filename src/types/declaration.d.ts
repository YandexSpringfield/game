declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.ico';
declare module '*.json';
declare module '*.ogg';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
type Maybe<T> = T | null | undefined;
