import axios from 'axios';
import { getCookie } from 'utils/cookie';
// import store from 'store/configureStore';

let BASE_URL = "http://localhost:8080/api";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const apiRequest = async (config, cancelToken) => {
  const accessToken = getCookie('jwt-access');
  const refreshToken = getCookie('jwt-refresh');

  config.headers = {
    'Authorization': `Bearer ${accessToken}`,
    'X-Refresh-Token': `Bearer ${refreshToken}`
  };

  if (cancelToken) {
    config.cancelToken = cancelToken;
  }

  try {
    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request:', error.message);
    } else {
      throw error;
    }
  }
};