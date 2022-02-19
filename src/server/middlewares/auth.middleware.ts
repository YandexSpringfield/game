/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { setAuthCookies } from '@server/helpers';
import { RequestStatus } from '@types';
import { authAPI } from '@api';

export async function authMiddleware(
  req: ServerRequest,
  res: Response,
  next: NextFunction,
) {
  const { cookies } = req;

  if (!cookies?.authCookie && !cookies?.uuid) {
    next();
  }

  try {
    const response = await authAPI.getUserInfo({
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
    });
    req.user = {
      ...response.data,
      requestStatus: RequestStatus.SUCCESS,
    };
  } catch {
    req.user = null;
  }

  next();
}
