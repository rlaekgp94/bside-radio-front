import { createSlice } from '@reduxjs/toolkit';
// import { setCookie, getCookie } from 'utils/cookie';

const initialState = {
  userInfo: null,
  isLoggedIn: null,
  sessionLoading: false,
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
      state.userInfo = null
      state.isLoggedIn = null
    },
  },
});

export default userSlice.reducer;
export const user = (state) => state.user;
export const { setUserInfo,
  clearUserInfo,
  setSessionLoading,
 } = userSlice.actions;