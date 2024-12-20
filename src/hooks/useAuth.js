import mixpanel from 'mixpanel-browser';
import base64 from "base-64";
import { getCookie } from 'utils/cookie';
import { getPoliciesValueAPI } from 'api/v1/policies'
import { getUserInfoAPI } from 'api/v1/user'
import { setUserInfo, setPoliciesLimit } from 'store/modules/user';
import { useSelector, useDispatch } from 'react-redux';

const useAuth = () => {
  const dispatch = useDispatch();

  const getJwtDecoding = () => {    
    const jwtAccess = getCookie('jwt-access');  
    if (jwtAccess) {
      const payload = jwtAccess.substring(jwtAccess.indexOf(".") + 1, jwtAccess.lastIndexOf("."));
      const decodingInfo = base64.decode(payload);
      const jwtToken = decodingInfo ? JSON.parse(decodingInfo) : null;
      return jwtToken;
    } else {
      return null;
    }
  } 
  
  const setUserDataLocalStorage = (userData) => {
    const accessToken = getJwtDecoding()
    if (!accessToken) return;
    localStorage.setItem('--user-data', userData);
  };


  const getUserInfo = async (userId) => {
    if (!userId) return;
    try {
      const res_info = await getUserInfoAPI(userId);
      const res_limit = await getPoliciesValueAPI();
      localStorage.setItem('--policies-limit', JSON.stringify(res_limit));
      setUserDataLocalStorage(JSON.stringify(res_info))
      dispatch(setUserInfo(res_info));
      dispatch(setPoliciesLimit(res_limit));
      mixpanel.people.set({
        "$email": res_info?.email,
        "$name": res_info?.nickname
      });
    } catch(e) {
      console.log("getUserInfo e: ", e)
    }
  }


  return { getJwtDecoding, setUserDataLocalStorage, getUserInfo };
};

export default useAuth;