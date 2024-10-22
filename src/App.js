import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mixpanel from 'mixpanel-browser';

import { setUserInfo, setSessionLoading } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import { getCookie, deleteCookie } from 'utils/cookie';
import PageTracking from './utils/PageTracking';
import AutoRouter from 'router/AutoRouter';

import Layout from './Layout';

function App() {
  const sessionLoading = useSelector(state => { return state?.user.sessionLoading; });
  const { getJwtDecoding, getUserInfo } = useAuth();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    mixpanel.init("e6769d0990d9d69011e4902258f94ad6", {
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

        dispatch(setSessionLoading(false))
      } else {
        getUserInfo(userId).finally(() => {
          dispatch(setSessionLoading(false))
        });
      }

    } else {
      // TODO 추후 로그아웃에도 설정
      mixpanel.reset();
      setUserId(null);
      deleteCookie('--user-data');
      dispatch(setSessionLoading(false))
    }
  }, []);

  return (    
    <Layout>
      {(!sessionLoading && userId) && <PageTracking userId={userId} />}
      <AutoRouter /> 
    </Layout>
  );
}


export default App;
