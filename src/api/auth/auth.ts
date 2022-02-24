import { instanceAxios } from 'src/api/axios';
import { PATH_API } from 'src/api/config';
import { TSignIn, TSignUp } from '..';

class AuthAPI {
  signUp = async (data: TSignUp) => {
    await instanceAxios.post(PATH_API.AUTH.SIGN_UP, data);
  };

  signIn = async (data: TSignIn) => {
    await instanceAxios.post(PATH_API.AUTH.SIGN_IN, data);
  };

  getUserInfo = async () => {
    return await instanceAxios.get(PATH_API.AUTH.USER);
  };

  logout = async () => {
    await instanceAxios.post(PATH_API.AUTH.LOGOUT);
  };

  yaGetId = async (data) => {
    return await instanceAxios.get(PATH_API.AUTH_YA.ID, data);
  };

  yaSingIn = async (data) => {
    await instanceAxios.post(PATH_API.AUTH_YA.SING_IN, data);
  };
}

export const authAPI = new AuthAPI();
