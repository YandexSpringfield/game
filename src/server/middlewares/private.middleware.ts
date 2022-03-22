import { NextFunction, Response } from 'express';
import { PrivateRequest } from '@server/types';
import { userService } from '@server/services';
import { setAuthCookies } from '@server';
import yandexApiInstanceAxios from '@server/axios';

export async function privateMiddleware(
  req: PrivateRequest,
  res: Response,
  next: NextFunction,
) {
  const { cookies } = req;

  if (!cookies?.uuid) {
    res.sendStatus(401);
    return;
  }

  try {
    const response = await yandexApiInstanceAxios.get('/api/v2/auth/user', {
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
    });
    const user = await userService.findById(response.data.id);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    req.user = response.data;

    next();
  } catch (err) {
    res.sendStatus(401);
  }
}
