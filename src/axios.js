import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token'); //Добавляем в headers Authorization, и вшиваем в него Токен
  config.headers.PostId = window.sessionStorage.getItem('postId');
  return config;
});
export default instance;
