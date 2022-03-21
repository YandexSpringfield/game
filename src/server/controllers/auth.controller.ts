import { Request, Response, Router } from 'express';
import setCookie from 'set-cookie-parser';
import apiInstance from '@server/axios';
import {
  privateMiddleware,
  proxyCookieOptions,
  proxyErrorHandler,
  setAuthCookies,
  parseProxyResponseCookies,
} from '@server';
import { userService, userThemeService } from '@server/services';

export const authRoute = Router();

type SignInReq = {
  login: string;
  password: string;
};

/**
 * Create user and create base theme
 */
async function createUserFromProxy(authCookie: string, uuid: string) {
  const response = await apiInstance.get('/api/v2/auth/user', {
    withCredentials: true,
    headers: setAuthCookies(authCookie, uuid),
  });
  await userService.findOrCreate({
    id: response.data.id,
    login: response.data.login,
  });
  await userThemeService.findOrCreate(response.data.id);
}

async function signIn(req: Request<null, any, SignInReq>, res: Response) {
  try {
    const { body } = req;

    if (!body.login || !body.password) {
      res.sendStatus(400);
      return;
    }

    const response = await apiInstance.post('/api/v2/auth/signin', body);
    const cookies = parseProxyResponseCookies(response.headers);

    const { uuid, authCookie } = cookies;
    await createUserFromProxy(authCookie.value, uuid.value);

    res.cookie(uuid.name, uuid.value, proxyCookieOptions(uuid));
    res.cookie(
      authCookie.name,
      authCookie.value,
      proxyCookieOptions(authCookie),
    );

    res.sendStatus(200);
  } catch (err) {
    proxyErrorHandler(res, err);
  }
}

async function logout(req: Request, res: Response) {
  try {
    const { cookies } = req;

    const response = await apiInstance.post(
      '/api/v2/auth/logout',
      {},
      {
        headers: setAuthCookies(cookies.authCookie, cookies.uuid),
        withCredentials: true,
      },
    );

    const yandexCookies = setCookie.parse(
      response.headers['set-cookie'] || [],
      {
        map: true,
      },
    );

    const { uuid, authCookie } = yandexCookies;

    res.cookie(uuid.name, uuid.value, proxyCookieOptions(uuid));
    res.cookie(
      authCookie.name,
      authCookie.value,
      proxyCookieOptions(authCookie),
    );

    res.sendStatus(200);
  } catch (err) {
    proxyErrorHandler(res, err);
  }
}

async function signUp(req: Request<null, any, SignInReq>, res: Response) {
  try {
    const { body } = req;
    const response = await apiInstance.post('/api/v2/auth/signup', body);
    const cookies = parseProxyResponseCookies(response.headers);

    const { uuid, authCookie } = cookies;
    await createUserFromProxy(authCookie.value, uuid.value);

    res.cookie(uuid.name, uuid.value, proxyCookieOptions(uuid));
    res.cookie(
      authCookie.name,
      authCookie.value,
      proxyCookieOptions(authCookie),
    );
    res.sendStatus(201);
  } catch (err) {
    proxyErrorHandler(res, err);
  }
}

authRoute.route('/sign-in').post(signIn);
authRoute.route('/sign-up').post(signUp);
authRoute.route('/sign-out').post([privateMiddleware, logout]);
