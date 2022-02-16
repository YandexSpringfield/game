/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { authAPI } from '@api';
import { setAuthCookies } from '@server/helpers';

export async function authMiddleware(
  req: ServerRequest,
  res: Response,
  next: NextFunction,
) {
  const { cookies } = req;

  if (!cookies?.authCookie && !cookies?.uuid) {
    req.user = null;
    next();
  }

  try {
    const response = await authAPI.getUserInfo({
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
    });
    req.user = response.data;
  } catch {
    req.user = null;
  }

  next();
}
