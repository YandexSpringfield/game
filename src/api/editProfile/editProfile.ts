import { instanceAxios } from 'src/api/axios';
import { PATH_API } from 'src/api/config';
import { TChangePasswordRequest, TUserRequest } from '..';

class EditProfileAPI {
  editAvatar = async (data: unknown) => {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    await instanceAxios.put(PATH_API.USER.AVATAR, data, config);
  };

  editPassword = async (data: TChangePasswordRequest) => {
    await instanceAxios.put(PATH_API.USER.PASSWORD, data);
  };

  editProfile = async (data: TUserRequest) => {
    await instanceAxios.put(PATH_API.USER.PROFILE, data);
  };
}

export const editProfileAPI = new EditProfileAPI();
