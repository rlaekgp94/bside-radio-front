
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import IconRead from 'assets/Icon/icon-read.svg';
import IconWrite from 'assets/Icon/icon-write.svg';

export default function FixedActionButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const storeUser = useSelector(state => { return state?.user; });
  const { isLoggedIn } = storeUser;

  const paths = ['/', '/memoryBox', '/myPage'];
  
  if (!paths.includes(pathname) || (!isLoggedIn && process.env.REACT_APP_ENV === 'production')) {
    return null;
  }
  
  return (
    <div className="fixed-action-wrapper">
      <div className="fixed-action-inner">
        <button onClick={() => navigate("/write")} className="icon-btn write">
          <img src={IconWrite} alt="write img 쓰기 편지 쓰기 이미지" />
        </button>
      </div>
    </div>
  )
}