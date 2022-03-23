export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const BASE_SERVER_API_URL = '/api/v1';

export const BASE_YA_URL = 'https://oauth.yandex.ru';

export const PATH_API = {
  AUTH: {
    SIGN_UP: '/auth/signup',
    SIGN_IN: '/auth/signin',
    USER: '/auth/user',
    LOGOUT: '/auth/logout',
  },
  AUTH_YA: {
    ID: '/oauth/yandex/service-id',
    SING_IN: '/oauth/yandex',
  },
  USER: {
    PROFILE: '/user/profile',
    AVATAR: '/user/profile/avatar',
    PASSWORD: '/user/password',
    UPDATE_THEME: '/theme',
  },
  LEADERBOARD: {
    ADD_USER: '/leaderboard',
    GET_TEAM_USERS: (teamName) => `/leaderboard/${teamName}`,
    GET_ALL_USERS: '/leaderboard/all',
  },
  FORUM: {
    CREATE_TOPIC: 'topics/create',
    CREATE_COMMENT: (topicId) => `topics/${topicId}/comments`,
    GET_TOPICS: 'topics',
    GET_COMMENTS: (topicId) => `topics/${topicId}/comments`,
    DELETE_COMMENT: (topicId, id) => `topics/${topicId}/comments/${id}`,
  },
};
