import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUserInfo, setSessionLoading } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import { getCookie, deleteCookie } from 'utils/cookie';

import Layout from './Layout';

import AutoRouter from 'router/AutoRouter';

function App() {
  const { getJwtDecoding, getUserInfo } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getJwtDecoding();
    const userData = getCookie('--user-data');
    
    if (accessToken) {
      const userId = accessToken?.sub;
      if (userData) {
        dispatch(setUserInfo(JSON.parse(userData)));
        dispatch(setSessionLoading(false))
      } else {
        getUserInfo(userId).finally(() => {
          dispatch(setSessionLoading(false))
        });
      }
    } else {
      deleteCookie('--user-data');
      dispatch(setSessionLoading(false))
    }
  }, []);

  return (    
    <Layout>
      <AutoRouter /> 
    </Layout>
  );
}


export default App;
