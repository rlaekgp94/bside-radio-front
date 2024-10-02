import axios from 'axios';
// import store from 'store/configureStore';

let BASE_URL = "https://upup-radio.site/api/v1";

export const apiClient = axios.create({
  baseURL: BASE_URL,
});

export const apiRequest = async (config, cancelToken) => {
  // const state = store.getState();
  // const jwtToken = state?.user?.jwtToken;
  // const idToken = state?.user?.idToken;

  // config.headers = {
  //   Authorization: jwtToken,
  //   Email: idToken?.email,
  //   ...(config.headers || {}),
  // };

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