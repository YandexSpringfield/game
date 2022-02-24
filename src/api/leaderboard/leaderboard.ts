import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
import { TLeaderboardNewLeaderRequest, TLeaderboardRequest } from '@api';
import { defaultPagination } from '@appConstants/leaderboard';
import { AxiosRequestConfig } from 'axios';

class LeaderboardAPI {
  addUser = async (
    data: TLeaderboardNewLeaderRequest,
    config?: AxiosRequestConfig,
  ) => {
    await instanceAxios.post(PATH_API.LEADERBOARD.ADD_USER, data, config);
  };

  getAllUsers = async (
    data: TLeaderboardRequest = defaultPagination,
    config?: AxiosRequestConfig,
  ) => {
    return await instanceAxios.post(
      PATH_API.LEADERBOARD.GET_ALL_USERS,
      data,
      config,
    );
  };
}

export const leaderboardAPI = new LeaderboardAPI();
