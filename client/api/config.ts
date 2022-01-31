export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const PATH_API = {
  AUTH: {
    SIGN_UP: '/auth/signup',
    SIGN_IN: '/auth/signin',
    USER: '/auth/user',
    LOGOUT: '/auth/logout',
  },
  USER: {
    PROFILE: '/user/profile',
    AVATAR: '/user/profile/avatar',
    PASSWORD: '/user/password',
  },
  LEADERBOARD: {
    ADD_USER: '/leaderboard',
    GET_ALL_USERS: '/leaderboard/all',
  },
};
