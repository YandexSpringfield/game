declare module '*.scss';
declare module '*.svg';
declare module '*.json';

type PartialRecord<K extends keyof any, T> = {
  [P in K]?: T;
};
