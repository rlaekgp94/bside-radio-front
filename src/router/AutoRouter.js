import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from 'pages/Home';
import Login from 'pages/user/Login';
import Register from 'pages/user/Register';
import EditProfile from 'pages/user/EditProfile';
import DeleteAccount from 'pages/user/DeleteAccount';
import MyPage from 'pages/user/MyPage';
import Reports from 'pages/service/reports/Main';
import WeeklyAnalyzableList from 'pages/service/reports/WeeklyAnalyzableList';
import DailyReportResult from 'pages/service/reports/DailyReportResult';
import WeeklyReportResult from 'pages/service/reports/WeeklyReportResult';
import MemoryBox from 'pages/service/MemoryBox';
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
  { redirect: '/login', path: '/reports', element: <Reports />, withAuthorization: true },
  { redirect: '/login', path: '/reports/analyzable-weekly-list', element: <WeeklyAnalyzableList />, withAuthorization: true },
  { redirect: '/login', path: '/reports/weekly-result', element: <WeeklyReportResult />, withAuthorization: true },
  { redirect: '/login', path: '/reports/daily-result', element: <DailyReportResult />, withAuthorization: true },
  { redirect: '/login', path: '/memoryBox', element: <MemoryBox />, withAuthorization: true },
  { redirect: '/login', path: '/myPage', element: <MyPage />, withAuthorization: true },
  { redirect: '/login', path: '/editProfile', element: <EditProfile />, withAuthorization: true },
  { redirect: '/login', path: '/deleteAccount', element: <DeleteAccount />, withAuthorization: true },
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
              process.env.REACT_APP_ENV === 'development' ?
              <Authorization
                isLoading={sessionLoading}
              >
                {route.element}
              </Authorization> :
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