import { useState  } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RabbitImg from 'assets/Content/login-rabbti.png'
import LogoS from 'assets/Logo/logo_s.svg'
import { CircularProgress } from '@mui/material';

export default function Login() {
  const [loading, setLoading] = useState(false);
  
  const SocialKakaoLogin = () => {
    TODO: 
    // window.location.href = "http://localhost:8080/oauth2/authorization/kakao" // local
    window.location.href = `${process.env.REACT_APP_SERVER_BASE_URL}/oauth2/authorization/kakao` // prod
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
          <button className={!loading ? "not" : ""} onClick={SocialKakaoLogin}>{loading ? <CircularProgress size={20} color="inherit" /> : "카카오로 시작하기"}</button>
        </div>
      </div>
    </div>
  )
}