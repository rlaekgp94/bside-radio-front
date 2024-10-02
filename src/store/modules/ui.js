import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  screen: {
    size: {
      width: null,
      height: null
    },
    viewType: {
      mobile: false,
      tablet: false,
      desktop: false
    },
    tuchDevice: false
  },
  isExpanded: localStorage.getItem('is_expanded') === 'true',
  sidebarView: localStorage.getItem('sidebar_view') ?? 'hidden'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setScreen: (state, action) => {
      const size = action.payload;
      state.screen.size = size;
      if (size.width) {
        state.screen.viewType = {
          mobile: size.width <= 768,
          tablet: size.width > 768 && size.width <= 1280,
          desktop: size.width > 1280
        };
        state.screen.tuchDevice = state.screen.viewType.tablet || state.screen.viewType.mobile;
      }
    },
    setIsExpanded: (state, action) => {
      state.isExpanded = action.payload;
      localStorage.setItem('is_expanded', state.isExpanded);
    },
    setSidebarView: (state, action) => {
      state.sidebarView = action.payload;
      localStorage.setItem('sidebar_view', state.sidebarView);
    }
  },
});

export default uiSlice.reducer;
export const getUiStore = (state) => state.ui;
export const { setScreen, setIsExpanded, setSidebarView } = uiSlice.actions;