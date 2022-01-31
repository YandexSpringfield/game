import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
class EditProfileAPI {
    constructor() {
        this.editAvatar = async (data) => {
            const config = {
                headers: {
                    'Content-type': 'multipart/form-data',
                },
            };
            await instanceAxios.put(PATH_API.USER.AVATAR, data, config);
        };
        this.editPassword = async (data) => {
            await instanceAxios.put(PATH_API.USER.PASSWORD, data);
        };
        this.editProfile = async (data) => {
            await instanceAxios.put(PATH_API.USER.PROFILE, data);
        };
    }
}
export const editProfileAPI = new EditProfileAPI();
