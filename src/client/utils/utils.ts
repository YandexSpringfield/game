import { VALIDATION_DATA as data } from '@appConstants';
import { ElementWithFullscreen, DocumentWithFullscreen } from '@types';

export const checkInput = (name: string, value: string) => {
  if (data[name]) {
    const { re } = data[name];
    return !re.test(value) ? data[name].message : '';
  }
  return '';
};

export const checkPassword = (
  name: string,
  value: string,
  password: string,
) => {
  if (value !== password && data[name]) {
    return data[name].message;
  }
  return '';
};

export const isEmpty = (obj): boolean => {
  return Object.values(obj).every((value) => value === '');
};

export const omit = (obj: {}, omitKey: string): {} => {
  const result = { ...obj };
  delete result[omitKey];
  return result;
};

export const sliceString = (str, length = 50) => {
  return str.length > length ? `${str.slice(0, length)}...` : str;
};

export const activateFullscreen = (element: ElementWithFullscreen) => {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};

export const deactivateFullscreen = () => {
  if (document.exitFullscreen) {
    document.exitFullscreen();
    // @ts-ignore
  } else if (document.mozCancelFullScreen) {
    // @ts-ignore
    document.mozCancelFullScreen();
    // @ts-ignore
  } else if (document.webkitExitFullscreen) {
    // @ts-ignore
    document.webkitExitFullscreen();
  }
};

export const getFullscreenElement = (document: DocumentWithFullscreen) => {
  return (
    document.fullscreenElement ||
    document.webkitFullscreenElement ||
    document.mozFullscreenElement ||
    document.msFullscreenElement
  );
};

export const parseNumbers = (str: string) => {
  const re = /([a-z]+)=([^&]+)/g;
  const founded = str.matchAll(re);

  return Array.from(founded).reduce(
    (obj: { [key: string]: string }, cur: RegExpMatchArray) => {
      const name = cur[1];
      const value = cur[2];
      /* eslint-disable no-param-reassign */
      obj[name] = value;
      return obj;
    },
    {},
  );
};

export default function cloneDeep<T extends object = object>(obj: T) {
  return (function _cloneDeep(
    item: T,
  ): T | Date | Set<unknown> | Map<unknown, unknown> | object | T[] {
    if (item === null || typeof item !== 'object') {
      return item;
    }

    if (item instanceof Date) {
      return new Date(item.valueOf());
    }

    if (item instanceof Array) {
      const copy: any[] = [];
      // eslint-disable-next-line
      item.forEach((_, i) => (copy[i] = _cloneDeep(item[i])));

      return copy;
    }

    if (item instanceof Set) {
      const copy = new Set();
      // eslint-disable-next-line
      item.forEach((v) => copy.add(_cloneDeep(v)));

      return copy;
    }

    if (item instanceof Map) {
      const copy = new Map();
      item.forEach((v, k) => copy.set(k, _cloneDeep(v)));

      return copy;
    }

    if (item instanceof Object) {
      const copy: object = {};
      Object.getOwnPropertySymbols(item).forEach(
        // eslint-disable-next-line
        (s) => (copy[s] = _cloneDeep(item[s])),
      );
      // eslint-disable-next-line
      Object.keys(item).forEach((k) => (copy[k] = _cloneDeep(item[k])));

      return copy;
    }

    throw new Error(`Unable to copy object: ${item}`);
  })(obj);
}
