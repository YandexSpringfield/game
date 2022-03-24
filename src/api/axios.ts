import axios from 'axios';
// import { BASE_URL } from '@api/config';

export const instanceAxios = axios.create({
  // baseURL: BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});
