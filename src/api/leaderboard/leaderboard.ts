import { instanceAxios } from '@api/axios';
import { BFF_URLS } from '@api/config';
import { TLeaderboardNewLeaderRequest, TLeaderboardRequest } from '@api';
import {
  defaultPagination,
  ratingFieldName,
  teamName,
} from '@appConstants/leaderboard';
import { AxiosRequestConfig } from 'axios';

class LeaderboardAPI {
  addUser = async (
    data: TLeaderboardNewLeaderRequest,
    config?: AxiosRequestConfig,
  ) => {
    await instanceAxios.post(BFF_URLS.addToLeaderBoard, data, config);
  };

  getAllUsers = async (
    data: TLeaderboardRequest = defaultPagination,
    config?: AxiosRequestConfig,
  ) => {
    return await instanceAxios.post(
      BFF_URLS.leaderboard,
      {
        ...data,
        ratingFieldName,
        teamName,
      },
      config,
    );
  };
}

export const leaderboardAPI = new LeaderboardAPI();
