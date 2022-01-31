import { instanceAxios } from '@api/axios';
import { PATH_API } from '@api/config';
import { defaultPagination } from '@appConstants/leaderboard';
class LeaderboardAPI {
    constructor() {
        this.addUser = async (data) => {
            await instanceAxios.post(PATH_API.LEADERBOARD.ADD_USER, data);
        };
        this.getAllUsers = async (data = defaultPagination) => {
            return await instanceAxios.post(PATH_API.LEADERBOARD.GET_ALL_USERS, data);
        };
    }
}
export const leaderboardAPI = new LeaderboardAPI();
