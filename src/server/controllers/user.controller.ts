import { Response, Router } from 'express';
import { PrivateRequest } from '@server/types';
import fs from 'fs';
import multipart from 'connect-multiparty';
import FormData from 'form-data';
import { proxyErrorHandler, setAuthCookies } from '@server';
import apiInstance from '@server/axios';

export const userRoute = Router();

const form = new FormData();

async function update(req: PrivateRequest, res: Response) {
  try {
    const { cookies, body } = req;
    const response = await apiInstance.put(`/api/v2/user/profile`, body, {
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

async function updateAvatar(req: PrivateRequest, res: Response) {
  try {
    const { cookies } = req;
    // @ts-ignore
    const image = fs.createReadStream(req.files.avatar.path);
    form.append('avatar', image);
    const response = await apiInstance.put(
      '/api/v2/user/profile/avatar',
      form,
      {
        headers: {
          ...setAuthCookies(cookies.authCookie, cookies.uuid),
          ...form.getHeaders(),
        },
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

async function updatePassword(req: PrivateRequest, res: Response) {
  try {
    const { cookies, body } = req;
    const response = await apiInstance.put(`/api/v2/user/password`, body, {
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

userRoute.put('/profile', update);
userRoute.put('/avatar', [multipart(), updateAvatar]);
userRoute.put('/password', updatePassword);
