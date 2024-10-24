import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";

import { letterResponseAPI } from 'api/v1/letters'
import TypeToggle from 'components/item/TypeToggle'

import IconClose from 'assets/Icon/icon-close-b.svg'
import RabbitImg from 'assets/Content/letter-write-rabbit-top.png'

import LoadingLayout from './Loading'


function WriteLayout({active, setActive, textareaVal, setTextareVal, letterResponse}) {
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { value } = e.target;
    if (value.length <= 200) {
      setTextareVal(value);
    }
  }

  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (    
    <div className="write__inner">
      <div className="custom-app-bar">
        <img onClick={handleBack} src={IconClose} alt="close btn img 닫기 버튼 이미지" />
      </div>
      <div className="write-container layout-p">
        <div className="content-head">
          <TypeToggle setActive={setActive} active={active} />
        </div>
        <div className="asset-container">
          <div className="speech-bubble">
            <p>DJ에게 보낼 사연을 작성해 주세요 !</p>
          </div>
          <img className="asset-img" src={RabbitImg} alt="rabbit img 토끼 이미지" />
        </div>
        <div className="content-body">
          <div className="write-textarea-wrapper">
            <textarea
              className="write-textarea"
              name="write-textarea"
              placeholder="DJ 달토에게 위로받고 싶은 내용을 담아 편지를 써보세요..."
              value={textareaVal}
              onChange={changeHandler}
            />
            <div className="string-length"><p>{textareaVal?.length ? textareaVal.length : "0"} / 200</p></div>
          </div>
        </div>
        <div className="content-foot">
          <button disabled={textareaVal.length < 10} className="submit" onClick={letterResponse}>사연 보내기</button>
        </div>
      </div>
    </div>
  )
}

function Write() {
  const navigate = useNavigate();
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [active, setActive] = useState(userInfo?.preference === "T" ? true : "F"); // false는 F true는 T
  const [textareaVal, setTextareVal] = useState("");
  const [loading, setLoading] = useState(false);
  
  const letterResponse = async () => {
    const preference = active ? "T" : "F";
    if (!userInfo?.userId || !textareaVal || !preference) return;
    setLoading(true);

    try {      
      const res = await letterResponseAPI(userInfo.userId, textareaVal, preference);    
      navigate("/result", { state: { resultData: res, preference } });
    } catch(e) {
      console.log("letterResponseAPI e: ", e)
      setLoading(false);
    }
  }
  
  useEffect(() => {
    const handleBeforeUnload = (event) => { // 새로고침 시 페이지 벗어날건지 확인
      if (textareaVal?.length) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [textareaVal?.length]);

  const writeData = { active, setActive, textareaVal, setTextareVal, letterResponse };

  return (
    <div className="write">        
      {loading ? 
        <LoadingLayout /> :
        <WriteLayout {...writeData} />
      }
    </div>
    )
  }
  
  export default Write;
  