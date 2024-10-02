
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from 'store/modules/components';

import IconRead from 'assets/Icon/icon-read.svg';
import IconWrite from 'assets/Icon/icon-write.svg';

export default function FixedActionButton() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  
  return (
    <div className="fixed-action-wrapper">
      <div className="fixed-action-inner">
        <button onClick={() => nav("/letterbox")} className="icon-btn read">
          <img src={IconRead} alt="read img 읽기 내 편지함 이미지" />
        </button>
        <button onClick={() => dispatch(openModal({modalType: "Write"}))} className="icon-btn write">
        <img src={IconWrite} alt="write img 쓰기 편지 쓰기 이미지" />
        </button>
      </div>
    </div>
  )
}