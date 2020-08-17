import { AxiosResponse } from 'axios';
import login from '../utils/login';
import { LoginType } from '../types/Login';
import axios from '../api';

jest.mock('../api');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const axiosReject: AxiosResponse = {
  data: { message: 'Invalid credentials' },
  status: 422,
  statusText: 'Unprocessable entity',
  headers: {},
  config: {},
};

const axiosResolve: AxiosResponse = {
  data: { username: 'JohnLukeThe3rd', role: 'user' },
  status: 200,
  statusText: '',
  headers: {},
  config: {},
};

const validUserData: LoginType = {
  username: 'Jesus',
  password: '123',
};

describe('login utility function', () => {
  it('should return 200 on success', async () => {
    mockedAxios.post.mockResolvedValue(axiosResolve);
    const response = await login(validUserData);
    expect(response.status).toEqual(200);
  });
  it('should return not 200 on failure', async () => {
    mockedAxios.post.mockRejectedValue({ response: axiosReject });
    try {
      await login(validUserData);
    } catch (e) {
      const { response } = e;
      expect(response.status).not.toEqual(200);
    }
  });
});

// erroneous change
