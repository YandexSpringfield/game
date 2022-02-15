/* eslint-disable no-param-reassign */
import { NextFunction, Response } from 'express';
import { ServerRequest } from '@server/types';

export function authMiddleware(
  req: ServerRequest,
  res: Response,
  next: NextFunction,
) {
  req.userToken = req.cookies?.authCookie;
  req.userId = req.cookies?.uuid;

  next();
}
