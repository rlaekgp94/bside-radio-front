import { useSelector } from 'react-redux';
import useAuth from 'hooks/useAuth';
import { DATA } from 'constants'

const UserProfile = () => {
  const userInfo = useSelector(state => { return state?.user.userInfo; });  
  const { getJwtDecoding } = useAuth();
  const { profileImageDisable, firstLogin } = userInfo;

  const accessToken = getJwtDecoding();
  const profileImageUrl = accessToken?.profileImageUrl || {};

  return (
    <>
      {!firstLogin && !profileImageDisable && profileImageUrl ?  
        <img className="profile" src={profileImageUrl} alt="profile img" /> :
        <img className="profile" src={DATA.defaultProfile} alt="defaultProfile img" />
      }
    </>
  );
};

export default UserProfile;