import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { setAuthCookies } from '@server/helpers';
import { RequestStatus } from '@types';
import { authAPI } from '@api';
import { userService } from '@server/services';

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

    const [user] = await userService.findOrCreate(cookies.uuid);

    console.log(user.uuid);

    req.user = {
      ...response.data,
      requestStatus: RequestStatus.SUCCESS,
    };
  } catch (err) {
    req.user = null;
  }

  next();
}
