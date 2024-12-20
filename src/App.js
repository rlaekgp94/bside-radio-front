import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import mixpanel from 'mixpanel-browser';
import { DATA } from 'constants'

import { setUserInfo, setSessionLoading, setPoliciesLimit, clearUserInfo } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import PageTracking from './utils/PageTracking';
import AutoRouter from 'router/AutoRouter';

import Layout from './Layout';

function App() {
  const sessionLoading = useSelector(state => { return state?.user.sessionLoading; });
  const { getJwtDecoding, getUserInfo } = useAuth();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    mixpanel.init(DATA.MIXPANEL_CLIENT_ID, {
      debug: process.env.REACT_APP_ENV === 'development',
      track_pageview: true,
    });

    const accessToken = getJwtDecoding();   
    const userData = localStorage.getItem('--user-data');
    const policiesLimit = localStorage.getItem('--policies-limit');

    if (accessToken) {
      const userId = accessToken?.sub;
      mixpanel.identify(userId);
      setUserId(userId);

      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const parsedPoliciesLimit = JSON.parse(policiesLimit);

        // Redux로 유저 정보/편지 제한 횟수 설정
        dispatch(setUserInfo(parsedUserData));
        dispatch(setPoliciesLimit(parsedPoliciesLimit));
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
      mixpanel.reset();
      setUserId(null);
      dispatch(setSessionLoading(false))
      dispatch(clearUserInfo())
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
