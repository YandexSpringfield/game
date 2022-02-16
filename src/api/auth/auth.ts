import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
import { TSignIn, TSignUp } from '@api';
import { AxiosRequestConfig } from 'axios';

class AuthAPI {
  signUp = async (data: TSignUp, config?: AxiosRequestConfig) => {
    await instanceAxios.post(PATH_API.AUTH.SIGN_UP, data, config);
  };

  signIn = async (data: TSignIn, config?: AxiosRequestConfig) => {
    await instanceAxios.post(PATH_API.AUTH.SIGN_IN, data, config);
  };

  getUserInfo = async (config?: AxiosRequestConfig) => {
    return await instanceAxios.get(PATH_API.AUTH.USER, config);
  };

  logout = async (config?: AxiosRequestConfig) => {
    await instanceAxios.post(PATH_API.AUTH.LOGOUT, config);
  };
}

export const authAPI = new AuthAPI();
