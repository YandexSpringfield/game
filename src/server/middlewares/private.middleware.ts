import { NextFunction, Response } from 'express';
import { PrivateRequest } from '@server/types';
import { userService } from '@server/services';
import { authAPI } from '@api';
import { setAuthCookies } from '@server';

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
    const response = await authAPI.getUserInfo({
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
    });
    const user = await userService.findById(response.data.id);

    if (!user) {
      res.sendStatus(401);
      return;
    }

    req.user = {
      id: user.getDataValue('id'),
      login: user.getDataValue('login'),
    };

    next();
  } catch (err) {
    res.sendStatus(401);
  }
}
