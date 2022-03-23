import { TLeaderboardRequest } from '@api';

export const resourcesUrl = 'https://ya-praktikum.tech/api/v2/resources';

export const teamName = 'springfieldMario';

export const ratingFieldName = 'springfieldMarioScore';

export const limit = 20;

export const defaultPagination: TLeaderboardRequest = {
  ratingFieldName,
  cursor: 0,
  limit,
};
