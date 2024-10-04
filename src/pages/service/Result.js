import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import TypeToggle from 'components/item/TypeToggle'

import LogoImg from 'assets/Logo/logo_w.svg';
import ImgRabbitRead from 'assets/Content/read-rabbit-origin.svg';
import ImgMicRead from 'assets/Content/read-mic.png';

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData, preference } = location.state || {};
  const [active, setActive] = useState(preference === "F" ? false : preference === "T" ? "T" : true); // false는 F true는 T
  
  useEffect(() => {
    if (!resultData) {
      navigate("/") 
    }
  }, [])

  if (!resultData) {
    return;
  }
  
  return ( 
    <div className="result">
      <div className="result__inner">
        <div className="head">
          <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        </div>
        <div className="body">
          <div className={`bubble-container type-${active ? "T" : "F"}`}>
            <div className="bubble-container__inner">      
            <p>{active ? resultData?.reply.message_t : resultData?.reply.message_f}</p>        
            </div>
          </div>
          <div className="assets-container">
            <TypeToggle active={active} setActive={setActive} />
            <div className="box">
              <p className="desc">반대의 위로<br />답변도 준비 했어요!</p>
              <img className="mic" src={ImgMicRead} alt="mic img 마이크 이미지" />
              <img className="rabbit" src={ImgRabbitRead} alt="rabbit img 편지를 읽고 있는 토끼 이미지" />
            </div>
          </div>
        </div>
      </div>
      <div className="result__footer">
        <div className="footer-inner">            
          <button onClick={()=> navigate("/write")} className="result-btn again">다시쓰기</button>
          <button onClick={()=> navigate("/")} className="result-btn home">홈으로</button>
        </div>
      </div>
    </div>
  )
  }
  
  export default Result;
  