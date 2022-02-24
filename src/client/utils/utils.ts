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

export const random = (a = 2, b = 0) => {
  return Math.floor(Math.random() * a) + b;
};

export const middle = (a, b) => {
  return b / 2 + a;
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