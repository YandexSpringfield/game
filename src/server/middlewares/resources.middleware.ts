import { Request, Response } from 'express';
import { proxyErrorHandler, setAuthCookies } from '@server';
import apiInstance from '@server/axios';

export const resourcesMiddleware = async (req: Request, res: Response) => {
  try {
    const { query, cookies } = req;
    const response = await apiInstance.get(`/api/v2/resources${query.url}`, {
      withCredentials: true,
      headers: setAuthCookies(cookies.authCookie, cookies.uuid),
      responseType: 'arraybuffer',
    });
    delete response.headers['set-cookie'];
    res.status(200).set(response.headers).send(response.data);
  } catch (err) {
    proxyErrorHandler(res, err);
  }
};
