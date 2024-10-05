import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setUserInfo } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import { getCookie, deleteCookie } from 'utils/cookie';

import Layout from './Layout';

import AutoRouter from 'router/AutoRouter';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { getJwtDecoding, getUserInfo } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = getJwtDecoding();
    const userData = getCookie('--user-data');
    
    if (accessToken) {
      const userId = accessToken?.sub;
      if (userData) {
        dispatch(setUserInfo(JSON.parse(userData)));
        setIsLoading(false);
      } else {
        getUserInfo(userId).finally(() => {
          setIsLoading(false);
        });
      }
    } else {
      deleteCookie('--user-data');
      setIsLoading(false);
    }
  }, []);

  return (    
    <Layout>
      <AutoRouter isLoading={isLoading} /> 
    </Layout>
  );
}


export default App;
