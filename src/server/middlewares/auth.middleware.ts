import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { setAuthCookies } from '@server/helpers';
import { RequestStatus } from '@types';
import { userService, userThemeService } from '@server/services';
import yandexApiInstanceAxios from '@server/axios';

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
    const response = await yandexApiInstanceAxios.get('/api/v2/auth/user', {
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
    });

    await userService.findOrCreate({
      id: response.data.id,
      login: response.data.login,
    });

    const [data] = await userThemeService.findOrCreate(response.data.id);

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
