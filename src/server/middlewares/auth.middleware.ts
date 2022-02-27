/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { setAuthCookies } from '@server/helpers';
import { RequestStatus } from '@types';
import { authAPI } from '@api';
import { collections } from '@server/db/collections';

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
    collections.users?.insertOne({ uuid: cookies.uuid });
    req.user = {
      ...response.data,
      requestStatus: RequestStatus.SUCCESS,
    };
  } catch {
    req.user = null;
  }

  next();
}
