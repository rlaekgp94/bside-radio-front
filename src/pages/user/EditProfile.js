import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import useAuth from 'hooks/useAuth';
import { patchUserInfoAPI } from 'api/v1/user'
import { setUserInfo } from 'store/modules/user';

import GoBackTitleBar from 'components/common/GoBackTitleBar';
import Switch from 'components/item/Toggle'
import { CircularProgress } from '@mui/material';

export default function Mypage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUserDataCookie } = useAuth();
  const userInfo = useSelector(state => { return state?.user.userInfo; });  
  const { 
    nickname: currentNickname, 
    preference: currentPreference, 
    profileImageEnabled: currentProfileImageDisable,
    emailAdsConsented: currentEmailAdsConsented,
  } = userInfo;
  
  const [nickname, setNickname] = useState(currentNickname ? currentNickname : "");
  const [type, setType] = useState(currentPreference ? currentPreference : "");
  const [profileImageEnabled, setProfileImageDisable] = useState(currentProfileImageDisable !== undefined ? currentProfileImageDisable: false);
  const [emailAdsConsented, setEmailAdsConsented] = useState(currentEmailAdsConsented !== undefined ? currentEmailAdsConsented : false);
  const [loading, setLoading] = useState(false);

  const updatedData = {};

  if (nickname !== currentNickname) {
    updatedData.nickname = nickname;
  }

  if (type !== currentPreference) {
    updatedData.type = type;
  }

  if (profileImageEnabled !== currentProfileImageDisable) {
    updatedData.profileImageEnabled = profileImageEnabled;
  }

  if (emailAdsConsented !== currentEmailAdsConsented) {
    updatedData.emailAdsConsented = emailAdsConsented;
  }


  const changeHandler = (e) => {
    const { value } = e.target;
    const regex = /^[ㄱ-ㅎ|가-힣|a-z|A-Z|0-9|]+$/;
    if (value === "") {
      setNickname(""); 
      return;
    }
    
    const isValidInput = regex.test(value) && value.length <= 12;

    if (isValidInput) {
      setNickname(value); 
    }  
  }

  const patchUserInfo = async () => {
    if (!userInfo?.userId || !Object.keys(updatedData).length) return;
    setLoading(true)
    console.log(userInfo.userId, nickname, type, profileImageEnabled, emailAdsConsented)
    try {
      const res = await patchUserInfoAPI(userInfo.userId, nickname, type, profileImageEnabled, emailAdsConsented);
      console.log("res", res)
      setUserDataCookie(JSON.stringify(res))
      dispatch(setUserInfo(res));
      navigate("/myPage")
      setLoading(false)
    } catch(e) {
      console.log("patchUserInfo e: ", e)
      setLoading(false)
    }
  }
  
  return (
    <div className="editProfile">
      <GoBackTitleBar title="프로필 수정하기" />
      <div className="editProfile__inner">
        <div className="body">
          <div className="user-data-container">
            <div className="data-box">
              <div className="data-box__title">
                <p>변경할 닉네임을 입력해주세요.</p>
              </div>
              <input type="text"
                className="user-nickname"
                autoComplete="off"
                id="user-nickname"
                name="user-nickname"
                placeholder="한글, 영문 포함 12글자 이내로 작성해 주세요."
                value={nickname}
                onChange={changeHandler} />
            </div>
            <div className="data-box">
              <div className="data-box__title">
                <p>받고싶은 답변의 기본 성향을 알려주세요.</p>
                <span>(언제든 변경이 가능해요.)</span>
              </div>
              <div className="type-btn-wrapper">
                <button onClick={() => setType("F")} className={`type-btn ${type === "F" ? "F" : ""}`}>F</button>
                <button onClick={() => setType("T")} className={`type-btn ${type === "T" ? "T" : ""}`}>T</button>
              </div>
            </div>
            <div className="data-box rows">
              <div className="data-box__title">
                <p>카카오톡 프로필 사진 동기화 여부</p>
              </div>
              <Switch active={profileImageEnabled} setActive={setProfileImageDisable} />              
            </div>
            <div className="data-box rows">
              <div className="data-box__title">
                <p>E-mail 광고성 정보 수신 동의</p>
              </div>
              <Switch active={emailAdsConsented} setActive={setEmailAdsConsented} />              
            </div>
          </div>
        </div>
        <div className="foot">
          <button disabled={!Object.keys(updatedData).length} onClick={patchUserInfo}>{loading ? <CircularProgress size={20} color="inherit" /> : "저장하기"}</button>
        </div>
      </div>
    </div>
  )
}