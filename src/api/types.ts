import { Theme } from '@types';

export type TSignUp = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
};

export type TSignIn = {
  login: string;
  password: string;
};

export type TChangePasswordRequest = {
  oldPassword: string;
  newPassword: string;
};

export type TUserRequest = {
  login: string;
  display_name: string;
  first_name: string;
  second_name: string;
  email: string;
};

export type TLeaderboardNewLeaderRequest = {
  data: unknown;
  ratingFieldName: string;
  teamName?: string;
};

export type TLeaderboardRequest = {
  ratingFieldName: string;
  cursor: number;
  limit: number;
};

export type TLeaderboardUser = {
  data: {
    avatar?: string;
    login?: string;
    city?: string;
    name?: string;
    score: number;
  };
};

export type TUpdateThemeResponse = {
  success: boolean;
  data: {
    theme: Theme;
  };
};
