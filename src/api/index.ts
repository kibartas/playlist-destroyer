import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:8080',
});

export const routes = {
  authentication: '/login',
  me: '/users/me',
  users: '/users',
};
