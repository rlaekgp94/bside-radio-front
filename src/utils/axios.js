import axios from 'axios';
import { getCookie } from 'utils/cookie';
import { jwtDecodingCookie } from 'utils/jwtDecodingCookie'
import { DATA } from 'constants'

let BASE_URL = `${DATA.BASE_URL}/api`

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = getCookie('jwt-access');
  const refreshToken = getCookie('jwt-refresh');
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  if (refreshToken) {
    config.headers['X-Refresh-Token'] = `Bearer ${refreshToken}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {    
    const response_accessToken = response?.headers['Authorization'] ? response.headers['Authorization'].replace('Bearer ', '')  : null;
    const response_refreshToken = response?.headers['X-Refresh-Token'] ? response.headers['X-Refresh-Token'].replace('Bearer ', '')  : null;
    if (response_accessToken) {
      jwtDecodingCookie("jwt-access", response_accessToken)
    }
    if (response_refreshToken) {
      jwtDecodingCookie("jwt-refresh", response_refreshToken)
    }
    return response.data;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      const response_accessToken = response?.headers['Authorization'] ? response.headers['Authorization'].replace('Bearer ', '')  : null;
      if (response_accessToken) {
        jwtDecodingCookie("jwt-access", response_accessToken)
        error.config.headers['Authorization'] = `Bearer ${response_accessToken}`;
        return axiosInstance(error.config);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;