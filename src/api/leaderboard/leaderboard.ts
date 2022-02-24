import { instanceAxios } from 'src/api/axios';
import { PATH_API } from 'src/api/config';
import { defaultPagination } from 'src/client/appConstants/leaderboard';
import { TLeaderboardNewLeaderRequest, TLeaderboardRequest } from '..';

class LeaderboardAPI {
  addUser = async (data: TLeaderboardNewLeaderRequest) => {
    await instanceAxios.post(PATH_API.LEADERBOARD.ADD_USER, data);
  };

  getAllUsers = async (data: TLeaderboardRequest = defaultPagination) => {
    return await instanceAxios.post(PATH_API.LEADERBOARD.GET_ALL_USERS, data);
  };
}

export const leaderboardAPI = new LeaderboardAPI();
