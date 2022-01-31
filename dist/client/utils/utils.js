import { VALIDATION_DATA as data } from '@appConstants';
export const checkInput = (name, value) => {
    if (data[name]) {
        const { re } = data[name];
        return !re.test(value) ? data[name].message : '';
    }
    return '';
};
export const checkPassword = (name, value, password) => {
    if (value !== password && data[name]) {
        return data[name].message;
    }
    return '';
};
export const omit = (obj, omitKey) => {
    const result = Object.assign({}, obj);
    delete result[omitKey];
    return result;
};
export const random = (a = 2, b = 0) => {
    return Math.floor(Math.random() * a) + b;
};
export const middle = (a, b) => {
    return b / 2 + a;
};
export const activateFullscreen = (element) => {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    }
    else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
    }
    else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
    else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
};
export const deactivateFullscreen = () => {
    if (document.exitFullscreen) {
        document.exitFullscreen();
        // @ts-ignore
    }
    else if (document.mozCancelFullScreen) {
        // @ts-ignore
        document.mozCancelFullScreen();
        // @ts-ignore
    }
    else if (document.webkitExitFullscreen) {
        // @ts-ignore
        document.webkitExitFullscreen();
    }
};
export const getFullscreenElement = (document) => {
    return (document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.mozFullscreenElement ||
        document.msFullscreenElement);
};
