/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { authAPI } from '@api';
import { setAuthCookies } from '@server/helpers';
import { initialState } from '@store/user/userSlice';
import { RequestStatus } from '@types';

export async function authMiddleware(
  req: ServerRequest,
  res: Response,
  next: NextFunction,
) {
  const { cookies } = req;

  if (!cookies?.authCookie && !cookies?.uuid) {
    req.user = initialState;
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
    req.user = initialState;
  }

  next();
}
