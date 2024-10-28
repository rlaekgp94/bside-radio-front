import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import LogoImg from 'assets/Logo/logo_s.svg';
import ImgLetterStamp from 'assets/Content/purple-letter-stamp.svg'

import useAuth from 'hooks/useAuth';
import { patchUserInfoAPI } from 'api/v1/user'
import { setUserInfo } from 'store/modules/user';

import Switch from 'components/item/Toggle'
import { CircularProgress } from '@mui/material';

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUserDataCookie } = useAuth();
  const userInfo = useSelector(state => { return state?.user.userInfo; });  
  
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("F");
  const [profileImageEnabled, setProfileImageDisable] = useState(false);
  const [loading, setLoading] = useState(false);

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
    if (!userInfo?.userId) return;
    setLoading(true)
    try {
      const res = await patchUserInfoAPI(userInfo.userId, nickname, type, profileImageEnabled);
      setUserDataCookie(JSON.stringify(res))
      dispatch(setUserInfo(res));
      navigate("/")
      setLoading(false)
    } catch(e) {
      console.log("patchUserInfo e: ", e)
      setLoading(false)
    }
  }

  return (
    <div className="register">
      <div className="register__inner">
        <div className="head">
          <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        </div>
        <div className="body">
          <div className="letter-content">
            <div className="letter-content-border">
              <p className="title">초대장</p>
              <div className="content">
                <ul className="desc">
                  <li>청취자님 안녕하세요! DJ 달토 입니다</li>
                  <li>사연을 보낼 닉네임과 받고싶은 답변의 기본 성향을 </li>
                  <li>체크해 보름달이 뜨는 밤, 달로 보내주세요 🌕</li>
                </ul>
                <p className="info">당신의 사연을 기다리는 DJ 달토로부터.</p>
              </div>
              <div className="img-layout">
                <p className="post">Rabbit Post</p>
                <img className="stamp" src={ImgLetterStamp} alt="rabbit stamp img 토끼 스탬프 이미지" />
              </div>
            </div>
          </div>
          <div className="user-data-container">
            <div className="data-box">
              <div className="data-box__title">
                <p>사연을 보낼 닉네임을 입력해 주세요.</p>
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
          </div>
        </div>
        <div className="foot">
          <button disabled={!nickname} onClick={patchUserInfo}>{loading ? <CircularProgress size={20} color="inherit" /> : "시작하기"}</button>
        </div>
      </div>
    </div>
  )
}