/* eslint-disable no-param-reassign */
import { ServerRequest } from '@server/types';
import { NextFunction, Response } from 'express';
import { routes, defaultPagination } from '@appConstants';
import { leaderboardAPI } from '@api';
import { setAuthCookies } from '@server';
import { RequestStatus } from '@types';

export async function storeMiddleware(
  req: ServerRequest,
  res: Response,
  next: NextFunction,
) {
  const { user, cookies, url } = req;

  if (user) {
    const cookieHeader = setAuthCookies(cookies.authCookie, cookies.uuid);

    switch (url) {
      case routes.leaderboard: {
        try {
          const { data } = await leaderboardAPI.getAllUsers(defaultPagination, {
            headers: cookieHeader,
          });
          req.leaderboard = {
            data,
            requestStatus: RequestStatus.SUCCESS,
          };
        } catch (err) {
          req.leaderboard = null;
        }

        next();
        break;
      }

      default:
        next();
    }
  }

  next();
}
