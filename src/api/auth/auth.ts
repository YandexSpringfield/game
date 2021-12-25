import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
import { TSignIn, TSignUp } from '@api';

class AuthAPI {
  signUp = async (data: TSignUp) => {
    return await instanceAxios.post(PATH_API.AUTH.SIGN_UP, data);
  };

  signIn = async (data: TSignIn) => {
    return await instanceAxios.post(PATH_API.AUTH.SIGN_IN, data);
  };

  getUserInfo = async () => {
    return await instanceAxios
      .get(PATH_API.AUTH.USER)
      .then((res) => res)
      .catch((err) => {
        throw new Error(`${err.response.data.reason}`);
      });
  };

  logout = async () => {
    return await instanceAxios.post(PATH_API.AUTH.LOGOUT);
  };
}

export const authAPI = new AuthAPI();
