import axios from 'axios';
import { getCookie } from 'utils/cookie';
import { jwtDecodingCookie } from 'utils/jwtDecodingCookie'

// let BASE_URL = "http://localhost:8080/api"; // local
let BASE_URL = `${process.env.REACT_APP_SERVER_BASE_URL}/api` // prod

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

    console.group("API response");

    console.log("response: ", response);
    console.log("response accessToken: ", response_accessToken);
    console.log("기존에 저장되어 있던 cookie accessToken: ", accessToken);
    console.log("기존 cookie accessToken === 응답 header accessToken: ", accessToken === response_accessToken);

    console.groupEnd();
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