import { AxiosError, AxiosRequestHeaders, AxiosResponseHeaders } from 'axios';
import { Response, CookieOptions } from 'express';
import setCookie, { Cookie } from 'set-cookie-parser';
import { DatabaseError, ValidationError } from 'sequelize';

export const setAuthCookies = (
  authCookie: string,
  uuid: string,
): AxiosRequestHeaders => {
  return {
    cookie: `authCookie=${authCookie}; uuid=${uuid}`,
  };
};

export const reqErrorHandler = (err: Error, res: Response) => {
  if (err instanceof DatabaseError || err instanceof ValidationError) {
    res.status(400).json({
      success: false,
      msg: err.message,
    });
    return;
  }
  res.sendStatus(500);
};

export const proxyCookieOptions = (cookie: Cookie): CookieOptions => ({
  expires: cookie.expires,
  httpOnly: true,
  secure: true,
  sameSite: 'none',
  path: cookie.path,
  domain: process.env.COOKIE_DOMAIN,
});

export const proxyErrorHandler = (res: Response, err: AxiosError) => {
  if (err.response?.status) {
    res.status(err.response.status).send({
      success: false,
      message: err.response?.data?.reason || 'Unexpected error',
    });
    return;
  }

  res.sendStatus(500);
};

export const parseProxyResponseCookies = (headers: AxiosResponseHeaders) => {
  return setCookie(headers['set-cookie'] || [], {
    map: true,
  });
};
