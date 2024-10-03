import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { letterResponseAPI } from 'api/v1/letters'

import TypeToggle from 'components/item/TypeToggle'

import ImgRabbitRead from 'assets/Content/read-rabbit-origin.svg';
import ImgMicRead from 'assets/Content/read-mic.png';

const mock = "친구와의 갈등이 생기면 마음이 복잡하고 아프죠. 사소한 일에서 시작했지만, 감정이 격해지고 서로를 비난하게 된 건 마음이 무척 상할 수밖에 없어요. 친구가 당신의 무관심을 느꼈다니, 그게 얼마나 속상했을지 이해가 돼요. 또, 당신이 친구의 의견이 존중받지 못한다고 느낀 것도 그만큼 실망스러웠겠죠. 이렇게 며칠째 말도 하지 않고 지내는 건 정말 괴로운 일일 거예요. 그 관계를 회복하고 싶지만, 어떻게 시작할지 막막한 기분도 너무 잘 알겠어요. 마음이 무거운 만큼, 이런 감정을 솔직하게 느끼는 것도 중요하다고 생각해요.친구와의 갈등이 생기면 마음이 복잡하고 아프죠. 사소한 일에서 시작했지만, 감정이 격해지고 서로를 비난하게 된 건 마음이 무척 상할 수밖에 없어요. 친구가 당신의 무관심을 느꼈다니, 그게 얼마나 속상했을지 이해가 돼요. 또, 당신이 친구의 의견이 존중받지 못한다고 느낀 것도 그만큼 실망스러웠겠죠. 이렇게 며칠째 말도 하지 않고 지내는 건 정말 괴로운 일일 거예요. 그 관계를 회복하고 싶지만, 어떻게 시작할지 막막한 기분도 너무 잘 알겠어요. 마음이 무거운 만큼, 이런 감정을 솔직하게 느끼는 것도 중요하다고 생각해요."
// const mock = "친구와의 갈등, 정말 힘든 상황이네요. 서로의 감정이 상한 만큼 화해는 쉽지 않겠지만, 마음을 전하는 게 중요해요. 간단히 “우리의 대화가 이렇게 끝나서 아쉬워. 다시 이야기하고 싶어”라고 메시지를 보내보세요. 대화할 때는 자신의 감정을 솔직하게 말하고, 친구의 입장도 들어주는 게 좋습니다. 이렇게 서로의 마음을 나누면 관계가 다시 가까워질 수 있을 거예요. 힘내세요!"

function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const { resultData } = location.state || {};
  const [active, setActive] = useState(false); // false는 F true는 T
  // console.log("location", location.state)

  
  return ( 
    <div className="result">
      <div className="result__inner">
        <div className="head">
          <div className="logo"><p>LOGO</p></div>
        </div>
        <div className="body">
          <div className={`bubble-container type-${active ? "T" : "F"}`}>
            <div className="bubble-container__inner">              
            <p>{mock}</p>
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
  