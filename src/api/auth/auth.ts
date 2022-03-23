import { instanceAxios } from '@api/axios';
import { BASE_SERVER_API_URL, BFF_URLS, PATH_API } from '@api/config';
import { TSignIn, TSignUp } from '@api';
import { AxiosRequestConfig } from 'axios';
import { Theme } from '@types';

class AuthAPI {
  signUp = async (data: TSignUp, config?: AxiosRequestConfig) => {
    await instanceAxios.post(BFF_URLS.signUp, data, config);
  };

  signIn = async (data: TSignIn, config?: AxiosRequestConfig) => {
    await instanceAxios.post(BFF_URLS.signIn, data, config);
  };

  getUserInfo = async (config?: AxiosRequestConfig) => {
    return await instanceAxios.get(BFF_URLS.me, config);
  };

  logout = async (config?: AxiosRequestConfig) => {
    await instanceAxios.post(BFF_URLS.logout, config);
  };

  yaGetId = async (data) => {
    return await instanceAxios.get(PATH_API.AUTH_YA.ID, data);
  };

  yaSingIn = async (data) => {
    await instanceAxios.post(PATH_API.AUTH_YA.SING_IN, data);
  };

  updateTheme = async (theme: Theme) => {
    return await instanceAxios.put(
      PATH_API.USER.UPDATE_THEME,
      {
        theme,
      },
      {
        baseURL: BASE_SERVER_API_URL,
      },
    );
  };
}

export const authAPI = new AuthAPI();
