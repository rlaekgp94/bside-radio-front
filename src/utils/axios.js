import axios from 'axios';
import { getCookie } from 'utils/cookie';
import { jwtDecodingCookie } from 'utils/jwtDecodingCookie'

let BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/api`

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const apiRequest = async (config, cancelToken) => {

  const accessToken = getCookie('jwt-access');
  const refreshToken = getCookie('jwt-refresh');

  config.headers = {
    'Authorization': `Bearer ${accessToken}`,
    'X-Refresh-Token': `Bearer ${refreshToken}`,
    'Content-Type': 'application/json',
  };

  if (cancelToken) {
    config.cancelToken = cancelToken;
  }
  
  try {
    const response = await apiClient(config);

    const response_accessToken = response?.headers['authorization'] ? response?.headers['authorization'].replace('Bearer ', '')  : null;
    const response_refreshToken = response?.headers['x-refresh-token'] ? response?.headers['x-refresh-token'].replace('Bearer ', '')  : null;

    if (response_accessToken && response_refreshToken) {
      jwtDecodingCookie("jwt-access", response_accessToken)
      jwtDecodingCookie("jwt-refresh", response_refreshToken)
    }

    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request:', error.message);
    } else {
      throw error;
    }
  }
};