import { useNavigate } from 'react-router-dom';

import LogoImg from 'assets/Logo/logo_s.svg';
import ImgListNotItem from 'assets/Content/list-not-item.png'

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="error">
      <div className="error__inner">
        <div className="head">
          <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        </div>
        <div className="body">
          <div className="img-wrapper">
            <img className="rabbit" src={ImgListNotItem} alt="error Not Found img 에러 이미지" />
          </div>
          <div className="body__desc">
            <p className="code">Not Found</p>
            <p className="message"><p>접근 권한이 없거나,<br />페이지가 존재하지 않습니다</p></p>
          </div>
        </div>
        <div className="foot">
          <button onClick={()=> nav("/")}>홈으로 가기</button>
        </div>
      </div>
    </div>
  )
}