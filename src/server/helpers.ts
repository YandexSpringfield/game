import { AxiosRequestHeaders } from 'axios';

export const setAuthCookies = (
  authCookie: string,
  uuid: string,
): AxiosRequestHeaders => {
  return {
    cookie: `authCookie=${authCookie}; uuid=${uuid}`,
  };
};
