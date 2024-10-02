import { createSlice } from '@reduxjs/toolkit';
// import { setCookie, getCookie } from 'utils/cookie';

const initialState = {
  userInfo: null,
  isLoggedIn: null,
  firstLogin: null,
  jwtToken: null,
  idToken: null,
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
    setUserToken: (state, action) => {
      const { jwtToken, idToken } = action.payload;
      state.jwtToken = jwtToken;
      state.idToken = idToken;
    },
    clearUserInfo:(state) => {
      state.userInfo = null
      state.isLoggedIn = null
      state.jwtToken = null;
      state.idToken = null;
      state.hasOtp = null;
      state.currentSymbol = null;
      state.betTotal = {
        wagerAmount: null,
        currentTier: "",
        nextTier: "",
      }
    },
  },
});

export default userSlice.reducer;
export const user = (state) => state.user;
export const { setUserInfo,
  clearUserInfo,
  setUserToken,
  setSessionLoading,
 } = userSlice.actions;