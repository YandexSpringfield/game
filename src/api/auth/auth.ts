import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
import { TSignIn, TSignUp } from '@api';

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
}

export const authAPI = new AuthAPI();