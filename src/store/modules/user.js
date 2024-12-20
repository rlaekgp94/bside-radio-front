import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'utils/cookie';
import mixpanel from 'mixpanel-browser';

const dev_user = {
  userId: "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
  nickname: "DEV_USER",
  email: "user001@gmail.com",
  preference: "T",
  profileImageEnabled: false,
  emailAdsConsented: false,
  agreeToTerms: false,
  agreeToPrivacyPolicy: false,
  firstLogin: false
}

const initialState = {
  userInfo: process.env.REACT_APP_ENV === 'development' ? dev_user : null,
  isLoggedIn: null,
  sessionLoading: true,
  policiesLimit: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setSessionLoading: (state, action) => {
      state.sessionLoading = action.payload;
    },
    setUserInfo: (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
        state.isLoggedIn = true;
      }
    },
    setPoliciesLimit: (state, action) => {
      if (action.payload) {
        state.policiesLimit = action.payload;
      }
    },
    clearUserInfo:(state) => {
      mixpanel.reset();
      if (process.env.REACT_APP_ENV === 'production') {
        state.userInfo = null;
        state.isLoggedIn = null;
        localStorage.removeItem('--policies-limit');
        localStorage.removeItem('--user-data');
        deleteCookie('jwt-access');
        deleteCookie('jwt-refresh');
      }
    },
  },
});

export default userSlice.reducer;
export const user = (state) => state.user;
export const { setUserInfo,
  clearUserInfo,
  setSessionLoading,
  setPoliciesLimit
 } = userSlice.actions;