import { TLeaderboardRequest } from '../../api';

export const resourcesUrl = 'https://ya-praktikum.tech/api/v2/resources';

export const defaultPagination: TLeaderboardRequest = {
  ratingFieldName: 'score',
  cursor: 0,
  limit: 20,
};
