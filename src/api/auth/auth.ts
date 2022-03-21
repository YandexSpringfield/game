import { instanceAxios } from '@api/axios';
import { BASE_SERVER_API_URL, BFF_URLS, PATH_API } from '@api/config';
import { TSignIn, TSignUp } from '@api';
import { AxiosRequestConfig } from 'axios';
import { Theme } from '@types';

class AuthAPI {
  signUp = async (data: TSignUp, config?: AxiosRequestConfig) => {
    await instanceAxios.post(PATH_API.AUTH.SIGN_UP, data, config);
  };

  signIn = async (data: TSignIn, config?: AxiosRequestConfig) => {
    await instanceAxios.post(BFF_URLS.signIn, data, config);
  };

  getUserInfo = async (config?: AxiosRequestConfig) => {
    return await instanceAxios.get(PATH_API.AUTH.USER, config);
  };

  logout = async (config?: AxiosRequestConfig) => {
    await instanceAxios.post(PATH_API.AUTH.LOGOUT, config);
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
