declare module '*.scss';
declare module '*.svg';
declare module '*.png';
declare module '*.ico';
declare module '*.json';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
