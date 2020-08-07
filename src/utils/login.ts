import { AxiosResponse } from 'axios';
import { LoginType } from '../types/Login';
import axios, { routes } from '../api';

const login = async (userData: LoginType): Promise<AxiosResponse> =>
  axios.post(routes.authentication, userData);

export default login;
