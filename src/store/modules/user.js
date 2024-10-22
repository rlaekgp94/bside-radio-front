import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'utils/cookie';
import mixpanel from 'mixpanel-browser';
// import { setCookie, getCookie } from 'utils/cookie';

const initialState = {
  userInfo: null,
  isLoggedIn: null,
  sessionLoading: true,
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
    clearUserInfo:(state) => {
      mixpanel.reset();
      state.userInfo = null;
      state.isLoggedIn = null;
      deleteCookie('--user-data');
      deleteCookie('jwt-access');
      deleteCookie('jwt-refresh');
    },
  },
});

export default userSlice.reducer;
export const user = (state) => state.user;
export const { setUserInfo,
  clearUserInfo,
  setSessionLoading,
 } = userSlice.actions;