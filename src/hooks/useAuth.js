import mixpanel from 'mixpanel-browser';
import base64 from "base-64";
import { getCookie, setCookie } from 'utils/cookie';
import { getUserInfoAPI } from 'api/v1/user'
import { setUserInfo } from 'store/modules/user';
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
  
  const setUserDataCookie = (userData) => {
    const accessToken = getJwtDecoding()
    if (!accessToken) return;
    setCookie("--user-data", userData, accessToken.exp)
  };


  const getUserInfo = async (userId) => {
    if (!userId) return;
    try {
      const res = await getUserInfoAPI(userId);
      setUserDataCookie(JSON.stringify(res))
      dispatch(setUserInfo(res));
      mixpanel.people.set({
        "$email": res?.email,
        "$name": res?.nickname
      });

    } catch(e) {
      console.log("getUserInfo e: ", e)
    }
  }


  return { getJwtDecoding, setUserDataCookie, getUserInfo };
};

export default useAuth;