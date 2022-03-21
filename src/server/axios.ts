import axios from 'axios';

const yandexApiInstanceAxios = axios.create({
  baseURL: 'https://ya-praktikum.tech',
});

export default yandexApiInstanceAxios;
