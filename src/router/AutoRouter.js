import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Register from 'pages/user/Register';
import Home from 'pages/Home';
import Login from 'pages/user/Login';
import Letterbox from 'pages/service/Letterbox';
import Write from 'pages/service/Write';
import Result from 'pages/service/Result';
import NotFound from 'pages/error/NotFound';

import { CircularProgress } from '@mui/material';

const RouterInfo = [
  { redirect: '/login', path: '/', element: <Home />, withAuthorization: true },
  { redirect: '/', path: '/login', element: <Login />, withAuthorization: false },
  { redirect: '/login', path: '/register', element: <Register />, withAuthorization: true },
  { redirect: '/login', path: '/write', element: <Write />, withAuthorization: true },
  { redirect: '/login', path: '/result', element: <Result />, withAuthorization: true },
  { redirect: '/login', path: '/letterbox', element: <Letterbox />, withAuthorization: true },
];

const Authorization = ({ children, isAuthenticated, isFirstLogin, isLoading, redirect, withAuthorization }) => {
  if (isLoading) return <div className="loading-container"><CircularProgress size={100} /></div>;
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

const AutoRouter = ({isLoading}) => {
  const storeUser = useSelector(state => { return state?.user; });
  const { isLoggedIn, userInfo } = storeUser;

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
                isLoading={isLoading}
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
      <Route path="*" element={<NotFound />} />
    </Routes>      
  );
};

export default AutoRouter;