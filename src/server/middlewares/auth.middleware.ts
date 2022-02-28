import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { setAuthCookies } from '@server/helpers';
import { RequestStatus } from '@types';
import { authAPI } from '@api';
import { userService, userThemeService } from '@server/services';

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

    await userService.findOrCreate(cookies.uuid);
    const [data] = await userThemeService.findOrCreate(cookies.uuid);

    req.user = {
      ...response.data,
      requestStatus: RequestStatus.SUCCESS,
      theme: data.getDataValue('theme'),
    };
  } catch (err) {
    console.log(err);
    req.user = null;
  }

  next();
}
