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

export const omit = (obj: {}, omitKey: string): {} => {
  const result = { ...obj };
  delete result[omitKey];
  return result;
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
