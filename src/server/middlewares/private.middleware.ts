import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';
import { userService } from '@server/services';

export async function privateMiddleware(
  req: ServerRequest,
  res: Response,
  next: NextFunction,
) {
  const { cookies } = req;

  if (!cookies?.uuid) {
    res.sendStatus(401);
    return;
  }

  const user = await userService.find(cookies.uuid);

  if (!user) {
    res.sendStatus(401);
    return;
  }

  next();
}
