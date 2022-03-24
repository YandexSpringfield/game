import { TLeaderboardRequest } from '@api';

export const resourcesUrl = '/api/v1/resources?url=';

export const teamName = 'springfieldMario';

export const ratingFieldName = 'springfieldMarioScore';

export const limit = 20;

export const defaultPagination: TLeaderboardRequest = {
  ratingFieldName,
  cursor: 0,
  limit,
};
