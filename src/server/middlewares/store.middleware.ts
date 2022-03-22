/* eslint-disable no-param-reassign */
import { ServerRequest } from '@server/types';
import { NextFunction, Response } from 'express';
import { defaultPagination, routes } from '@appConstants';
import { setAuthCookies } from '@server';
import { RequestStatus } from '@types';
import apiInstance from '@server/axios';

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
          const response = await apiInstance.post(
            '/api/v2/leaderboard/all',
            defaultPagination,
            {
              headers: cookieHeader,
            },
          );
          req.leaderboard = {
            data: response.data,
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
