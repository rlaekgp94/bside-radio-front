import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import mixpanel from 'mixpanel-browser';

import { setUserInfo } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import { getCookie, deleteCookie } from 'utils/cookie';
import PageTracking from './utils/PageTracking';
import AutoRouter from 'router/AutoRouter';

import Layout from './Layout';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { getJwtDecoding, getUserInfo } = useAuth();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    mixpanel.init("e37c0a57024fa52ef338e66808c216f4", {
      debug: process.env.REACT_APP_ENV === 'development',
      track_pageview: true,
    });

    const accessToken = getJwtDecoding();
    const userData = getCookie('--user-data');
    
    if (accessToken) {
      const userId = accessToken?.sub;
      mixpanel.identify(userId);
      setUserId(userId);

      if (userData) {
        const parsedUserData = JSON.parse(userData);

        // Redux로 유저 정보 설정
        dispatch(setUserInfo(parsedUserData));
        // Mixpanel에 유저 정보 설정
        mixpanel.people.set({
          "$email": parsedUserData?.email,
          "$name": parsedUserData?.nickname
        });

        setIsLoading(false);
      } else {
        getUserInfo(userId).finally(() => {
          setIsLoading(false);
        });
      }

    } else {
      // TODO 추후 로그아웃에도 설정
      mixpanel.reset();
      setUserId(null);
      deleteCookie('--user-data');
      setIsLoading(false);
    }
  }, []);

  return (    
    <Layout>
      {(!isLoading && userId) && <PageTracking userId={userId} />}
      <AutoRouter isLoading={isLoading} /> 
    </Layout>
  );
}


export default App;
