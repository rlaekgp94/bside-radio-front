import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from 'pages/Home';
import Login from 'pages/user/Login';
import Register from 'pages/user/Register';
import MyPage from 'pages/user/MyPage';
import Setting from 'pages/user/Setting';
import Letterbox from 'pages/service/Letterbox';
import Write from 'pages/service/Write';
import Result from 'pages/service/Result';
import NotFound from 'pages/error/NotFound';
import Error from 'pages/error/Error';

import { CircularProgress } from '@mui/material';

const RouterInfo = [
  { redirect: '/login', path: '/', element: <Home />, withAuthorization: true },
  { redirect: '/', path: '/login', element: <Login />, withAuthorization: false },
  { redirect: '/login', path: '/register', element: <Register />, withAuthorization: true },
  { redirect: '/login', path: '/write', element: <Write />, withAuthorization: true },
  { redirect: '/login', path: '/result', element: <Result />, withAuthorization: true },
  { redirect: '/login', path: '/letterbox', element: <Letterbox />, withAuthorization: true },
  { redirect: '/login', path: '/setting', element: <Setting />, withAuthorization: true },
  { redirect: '/login', path: '/myPage', element: <MyPage />, withAuthorization: true },
];

const Authorization = ({ children, isAuthenticated, isFirstLogin, isLoading, redirect, withAuthorization }) => {
  if (isLoading) return <div className="loading-container"><CircularProgress size={70} /></div>;
  if (withAuthorization && !isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  if (isFirstLogin && withAuthorization && window.location.pathname !== '/register') {
    return <Navigate to="/register" />;
  }
  
  if (!withAuthorization && isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

const AutoRouter = () => {
  const storeUser = useSelector(state => { return state?.user; });
  const { isLoggedIn, userInfo, sessionLoading } = storeUser;

  return (
    <Routes>
      {RouterInfo.map((route) => {
        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <Authorization
                redirect={route.redirect}
                isLoading={sessionLoading}
                isAuthenticated={isLoggedIn}
                isFirstLogin={userInfo?.firstLogin}
                withAuthorization={route.withAuthorization}
              >
                {route.element}
              </Authorization>
            }
          />
        );
      })}
      <Route path='error/:code' element={<Error />} />
      <Route path="*" element={<NotFound />} />
    </Routes>      
  );
};

export default AutoRouter;