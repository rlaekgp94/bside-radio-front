import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, path }) => {
  const isLoggedIn = localStorage.getItem('isLoggedIn'); // 로그인 상태
  const isSkipped = localStorage.getItem('isSkipped'); // 스킵 상태

  if (isSkipped && path === "/" || isLoggedIn) {
    return children; // 스킵한 경우, 홈 화면을 그대로 렌더링
  }

  return <Navigate to="/login" replace />; // 로그인 or 스킵하지 않은 경우 로그인 화면으로
};

export default PrivateRoute;
