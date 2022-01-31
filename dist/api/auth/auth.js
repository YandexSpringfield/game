import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
class AuthAPI {
    constructor() {
        this.signUp = async (data) => {
            await instanceAxios.post(PATH_API.AUTH.SIGN_UP, data);
        };
        this.signIn = async (data) => {
            await instanceAxios.post(PATH_API.AUTH.SIGN_IN, data);
        };
        this.getUserInfo = async () => {
            return await instanceAxios.get(PATH_API.AUTH.USER);
        };
        this.logout = async () => {
            await instanceAxios.post(PATH_API.AUTH.LOGOUT);
        };
    }
}
export const authAPI = new AuthAPI();
