import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'store/modules/user'

import axios from 'axios';

// import RabbitImg from 'assets/Content/login-rabbti.png'
import RabbitImg from 'assets/Content/letter-write-rabbit-top.png'

function SocialKakao() {
  const REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  // oauth 요청 URL
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`

  const handleLogin = ()=>{
    window.location.href = kakaoURL
  }

  return(
    <button onClick={handleLogin}>카카오 로그인</button>
  )
}

export default function Login() {
  const isLoggedIn = useSelector(state => { return state?.user?.isLoggedIn; });
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const code = searchParams.get('code');
  

  // useEffect(() => {
  //   if (code) {
  //     console.log("code: ", code)
  //     dispatch(setUserInfo({ name: "김다혜" }));
  //     nav("/")
  //   }
  // }, [code])

  const handleSkip = () => {
    localStorage.setItem('isSkipped', true);
    nav('/'); // 스킵 후 홈 화면으로 이동
  };
  
  // const handleLogin = () => {
  //   localStorage.setItem('isLoggedIn', true);
  //   nav('/'); // 로그인 후 홈 화면으로 이동
  //   window.location.reload();
  // };
  
  // const kakaoLogin = () => {
  //   window.Kakao.Auth.login({
  //     success: async function(data) {
  //       console.log("window.Kakao.Auth data", data)
  //       await KakaoLoginSuccess(data);
  //     },
  //     fail: function(data){
  //       alert(data);
  //     }
  //   });
  // };

  // const KakaoLoginSuccess = async(data) => {
  //   const access_token = data.access_token;
  //   const body = { access_token: access_token };

  //   try {
  //     // 서버로 액세스 토큰 전송
  //     const response = await axios.post('https://upup-radio.site/login/oauth2/code/kakao', body);
  //     console.log("response: ", response)
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const {Kakao} = window;

  const initKakao = () => {
    if (Kakao && !Kakao.isInitialized()) {
      Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY)
    }
  }
  
  useEffect(() => {
    initKakao()
  }, [])
  
  const kakaoLoginHandler = () => {
    Kakao.Auth.authorize({
      redirectUri: "https://upup-radio.site/login/oauth2/code/kakao",
      scope: 'profile_nickname,profile_image,account_email'
    })
  }

  // useEffect(() => {      
  //   if(!window.Kakao.isInitialized()){
  //     window.Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
  //   }
  // });

  return (
    <div className="login">
      <div className="login__inner">
        <div className="body">
          <img src={RabbitImg} alt="login rabbit" />
        </div>
        <div className="foot">
          <button onClick={kakaoLoginHandler}>카카오톡으로 로그인 하기</button>
          <button onClick={handleSkip}>게스트로 로그인 하기</button>
        </div>
      </div>
    </div>
  )
}