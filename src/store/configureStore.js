import { configureStore } from '@reduxjs/toolkit';
import user from './modules/user';
import ui from './modules/ui';
import components from './modules/components';

const store = configureStore({
  reducer:{
    user,
    ui,
    components
  }
});

export default store;