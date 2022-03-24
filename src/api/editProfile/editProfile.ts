import { instanceAxios } from '@api/axios';
import { BFF_URLS } from '@api/config';
import { TChangePasswordRequest, TUserRequest } from '@api';

class EditProfileAPI {
  editAvatar = async (data: unknown) => {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };

    await instanceAxios.put(BFF_URLS.updateAvatar, data, config);
  };

  editPassword = async (data: TChangePasswordRequest) => {
    await instanceAxios.put(BFF_URLS.updatePassword, data);
  };

  editProfile = async (data: TUserRequest) => {
    await instanceAxios.put(BFF_URLS.updateProfile, data);
  };
}

export const editProfileAPI = new EditProfileAPI();
