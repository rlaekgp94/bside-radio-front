import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'store/modules/user'

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
  
  const handleLogin = () => {
    localStorage.setItem('isLoggedIn', true);
    nav('/'); // 로그인 후 홈 화면으로 이동
    window.location.reload();
  };

  return (
    <div className="login-layout">
      {/* <SocialKakao /> */}      
      <button onClick={handleLogin}>로그인</button>
      <button onClick={handleSkip}>홈으로 가기</button>
    </div>
  )
}