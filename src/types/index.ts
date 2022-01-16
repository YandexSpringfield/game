export enum RequestStatus {
  INIT = 'INIT',
  REQUEST = 'REQUEST',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export interface DocumentElementWithFullscreen extends HTMLElement {
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
