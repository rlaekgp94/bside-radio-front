import { Navigate, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PrivateRoute from './utils/PrivateRoute';

import Layout from './Layout';

import Login from './pages/Login';
import Register from './pages/Register';

import Home from './pages/Home';
import Letterbox from './pages/Letterbox';
import Result from './pages/Result';

import NotFound from './pages/error/NotFound';

// TODO:
// login: 로그인이 되어있을때 로그인 페이지 진입 안되게
// login: 로그인 스킵하면 홈은 갈 수 있게
// register: 회원 정보 수정 페이지를 다시 갈 수 있는가?
// result: 아무 결과 값이 없다면 notFound로

function App() {
  // const storeUser = useSelector(state => { return state?.user; });
  // const { userInfo, sessionLoading, isLoggedIn, firstLogin, jwtToken } = storeUser;
  // const userSkip = false;

  const isLoggedIn = localStorage.getItem('isLoggedIn'); // 로그인 상태 확인
  const isSkipped = localStorage.getItem('isSkipped'); // 스킵 상태

  return (      
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route index element={<PrivateRoute path="/"><Home /></PrivateRoute>} />
      <Route path="/login" element={isLoggedIn ? <Navigate to="/" replace /> : <Login />} />
      <Route path="/register" element={<PrivateRoute><Register /></PrivateRoute>} />
      <Route path="/result" element={<Result />} /> // 결과값없으면 홈으로 이동
      <Route path="/letterbox" element={<Letterbox />} />
      <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
