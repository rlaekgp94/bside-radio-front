import { useNavigate } from 'react-router-dom';

import ImgListNotItem from 'assets/Content/list-not-item.png'

export default function NotFound() {
  const nav = useNavigate();

  return (
    <div className="error">
      <div className="error__inner">
        <div className="body">
          <img className="rabbit" src={ImgListNotItem} alt="error rabbit img 에러 이미지" />
          <p>접근 권한이 없거나,<br />페이지가 존재하지 않습니다</p>
        </div>
        <div className="foot">
          <button onClick={()=> nav("/")}>홈으로 가기</button>
        </div>
      </div>
    </div>
  )
}