import { useState  } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RabbitImg from 'assets/Content/login-rabbti.png'
import LogoS from 'assets/Logo/logo_s.svg'
import { CircularProgress } from '@mui/material';

import { DATA } from 'constants'


export default function Login() {
  const [loading, setLoading] = useState(false);
  
  const SocialKakaoLogin = () => {
    window.location.href = `${DATA.BASE_URL}/oauth2/authorization/kakao`
    setLoading(true);
  }
  
  return (
    <div className="login">
      <div className="login__inner">
        <div className="body">
          <img className="rabbit" src={RabbitImg} alt="login rabbit 로그인 토끼 이미지" />
          <img className="logo" src={LogoS} alt="login logo 로그인 로고" />
        </div>
        <div className="foot">
          <button className={`${!loading ? "not" : ""} login-btn`} onClick={SocialKakaoLogin}>{loading ? <CircularProgress size={20} color="inherit" /> : "카카오로 시작하기"}</button>
          <a className="link" target="_black" href={DATA.PRIVACY_POLICY_URL}>개인정보처리방침</a>
        </div>
      </div>
    </div>
  )
}