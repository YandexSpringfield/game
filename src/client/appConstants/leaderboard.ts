import { TLeaderboardRequest } from '@api';

export const resourcesUrl = '/api/v1/resources?url=';

export const defaultPagination: TLeaderboardRequest = {
  ratingFieldName: 'score',
  cursor: 0,
  limit: 50,
};
