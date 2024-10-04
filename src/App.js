import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setUserInfo } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import { getCookie } from 'utils/cookie';

import Layout from './Layout';

import AutoRouter from 'router/AutoRouter';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const storeUser = useSelector(state => { return state?.user; });
  const { userInfo, isLoggedIn } = storeUser;
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
      setIsLoading(false);
    }
  }, [dispatch]);

  
  useEffect(() => {
    console.log("userInfo stroe: ", userInfo, isLoggedIn)
  }, [userInfo, isLoggedIn])  

  return (    
    <Layout>
      <AutoRouter isLoading={isLoading} /> 
    </Layout>
  );
}


export default App;
