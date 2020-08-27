import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? process.env.API
      : 'http://localhost:8080',
});

export const routes = {
  authentication: '/login',
  me: '/users/me',
  users: '/users',
};
