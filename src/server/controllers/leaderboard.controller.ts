import { Response, Router } from 'express';
import { PrivateRequest } from '@server/types';
import { proxyErrorHandler, setAuthCookies } from '@server';
import apiInstance from '@server/axios';

export const leaderboardRoute = Router();

async function get(req: PrivateRequest, res: Response) {
  try {
    const { cookies, body } = req;
    const response = await apiInstance.post(
      `/api/v2/leaderboard/springfieldMario`,
      body,
      {
        headers: setAuthCookies(cookies.authCookie, cookies.uuid),
      },
    );
    res.status(200).send({
      success: true,
      data: response.data,
    });
  } catch (err) {
    proxyErrorHandler(res, err);
  }
}

async function create(req: PrivateRequest, res: Response) {
  try {
    const { cookies, body } = req;
    const response = await apiInstance.post('/api/v2/leaderboard', body, {
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
    });
    res.status(200).send({
      success: true,
      data: response.data,
    });
  } catch (err) {
    proxyErrorHandler(res, err);
  }
}

leaderboardRoute.post('/', get);
leaderboardRoute.post('/create', create);
