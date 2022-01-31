import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
import { TLeaderboardNewLeaderRequest, TLeaderboardRequest } from '@api';
import { defaultPagination } from '@appConstants/leaderboard';

class LeaderboardAPI {
  addUser = async (data: TLeaderboardNewLeaderRequest) => {
    await instanceAxios.post(PATH_API.LEADERBOARD.ADD_USER, data);
  };

  getAllUsers = async (data: TLeaderboardRequest = defaultPagination) => {
    return await instanceAxios.post(PATH_API.LEADERBOARD.GET_ALL_USERS, data);
  };
}

export const leaderboardAPI = new LeaderboardAPI();
