import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import RabbitImg from 'assets/Content/login-rabbti.png'
import LogoS from 'assets/Logo/logo_s.svg'

export default function Login() {
  const isLoggedIn = useSelector(state => { return state?.user?.isLoggedIn; });
  
  const SocialKakaoLogin = () => {
    // TODO: https://upup-radio.site/oauth2/authorization/kakao
    window.location.href = "http://localhost:8080/oauth2/authorization/kakao"
  }
  
  return (
    <div className="login">
      <div className="login__inner">
        <div className="body">
          <img className="rabbit" src={RabbitImg} alt="login rabbit 로그인 토끼 이미지" />
          <img className="logo" src={LogoS} alt="login logo 로그인 로고" />
        </div>
        <div className="foot">
          <button onClick={SocialKakaoLogin}>카카오로 시작하기</button>
        </div>
      </div>
    </div>
  )
}