export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface ElementWithFullscreen extends HTMLElement {
  fullscreenElement?: boolean;
  mozFullScreenElement?: boolean;
  webkitFullscreenElement?: boolean;
  msFullscreenElement?: boolean;
  msRequestFullscreen?: () => void;
  mozRequestFullScreen?: () => void;
  webkitRequestFullscreen?: () => void;
  exitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}
export interface DocumentWithFullscreen extends HTMLDocument {
  mozFullScreenElement?: Element;
  msFullscreenElement?: Element;
  webkitFullscreenElement?: Element;
  mozFullscreenElement?: Element;
  msExitFullscreen?: () => void;
  mozCancelFullScreen?: () => void;
  webkitExitFullscreen?: () => void;
}
