import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";

import { getUserLetterLimitAPI } from 'api/v1/user'
import { letterResponseAPI } from 'api/v1/letters'

import IconClock from 'assets/Icon/icon-clock.svg'
import RabbitImg from 'assets/Content/write/letter-write-rabbit-top.png'
import IconLetterMode from 'assets/Content/write/icon-letter-mode.svg'
import IconDiaryMode from 'assets/Content/write/icon-diary-mode.svg'
import IconFMode from 'assets/Content/write/icon-F-mode.svg'
import IconTMode from 'assets/Content/write/icon-T-mode.svg'
import BubbleLetter from 'assets/Content/write/letter-speech-bubble.png'
import BubbleDiary from 'assets/Content/write/diary-speech-bubble.png'
import AccessoryLetter from 'assets/Content/write/letter-accessory.svg'
import AccessoryDiary from 'assets/Content/write/diary-accessory.svg'
import WritingLetter from 'assets/Content/write/writing-letter-post.svg'

import LoadingLayout from './loading/WriteLoading'
import GoBackTitleBar from 'components/common/GoBackTitleBar';

function currentDateFormat() {
  const currentDate = new Date();
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const month = monthNames[currentDate.getMonth()];
  const day = String(currentDate.getDate()).padStart(2, '0');
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day} . ${year}`;
  return formattedDate;
}

function WriteLayout({preference, setPreference, textareaVal, setTextareVal, published, setPublished, letterResponse}) {
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const policiesLimit = process.env.REACT_APP_ENV === 'production' ? useSelector(state => { return state?.user.policiesLimit; })?.limit : 10
  const [seconds, setSeconds] = useState(null);
  const [letterLimitObj, setLetterLimitObj] = useState({});
  const [snackState, setSnackState] = useState(false);
  const timerRef = useRef(null); // 타이머 ID 저장

  console.log(userInfo)

  const handleModeChange = () => {
    setPublished(!published);
    showSnackbar()
  };
  
  const showSnackbar = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    setSnackState(true);
    timerRef.current = setTimeout(() => {
      setSnackState(false);
      timerRef.current = null;
    }, 2000);
  };
  const handlePreferenceChange = () => {
    const newMode = preference === "T" ? "F" : "T"
    setPreference(newMode);
  };

  const getUserLetterLimit = async () => {
    if (!userInfo?.userId) return;
    try {      
      const res = await getUserLetterLimitAPI(userInfo.userId);  
      setLetterLimitObj(res)
      setSeconds(res?.ttl)
    } catch(e) {
      console.log("getUserLetterLimitAPI e: ", e)
    }
  }
  

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  useEffect(() => {
    let timeout;
    if (seconds > 0) {
      timeout = setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else if (seconds <= 0) {
      getUserLetterLimit()
    }

    return () => clearTimeout(timeout);
  }, [seconds]);


  const hours = formatTime(Math.floor(seconds / 3600));
  const minutes = formatTime(Math.floor((seconds % 3600) / 60));
  const sec = formatTime(seconds % 60);

  const changeHandler = (e) => {
    const { value } = e.target;
    if (value.length <= 200) {
      setTextareVal(value);
    }
  }

  const postAction = {
    title: "완료",
    fuc: () => {
      letterResponse()
    },
    disabled: textareaVal.length < 10 || Number(letterLimitObj.usage) > policiesLimit
  }

  return (    
    <div className="write__wrapper">      
      <GoBackTitleBar title="글쓰기" action={postAction} bg={true} />
      <div className="write__wrapper--inner">   
        <div className={`write-area-wrapper layout-p ${published ? "letter" : "diary"}`}>
          <div className="asset-container">
            <img className="asset-img" src={RabbitImg} alt="rabbit img 토끼 이미지" />
            <img className="speech-bubble" src={published ? BubbleLetter : BubbleDiary} alt="speech bubble 말풍선" /> 
            {published ?
              <img className="letter-accessory" src={AccessoryLetter} alt="letter accessory 악세사리 이미지" /> :
              <img className="diary-accessory" src={AccessoryDiary} alt="diary accessory 악세사리 이미지" />}
          </div>     
          <div className="write-area-inner">
            {published && <img className="writing-letter-post" src={WritingLetter} alt="letter writing 타이포그래피" />}
            <div className="write-info">
              <p className={`title ${published ? "letter" : "diary"}`}>{published ? "To. DJ 달토" : "달로 보내는 비밀 일기"}</p>
              <p className="date">{currentDateFormat()}</p>
            </div>
            <textarea
              className="write-textarea"
              name="write-textarea"
              placeholder="달토에게 보내는 글을 적어보세요..."
              value={textareaVal}
              onChange={changeHandler}
            />
          </div>
        </div>
        <div className="write-status layout-p">
          <div className="letter-usage">
            <p className="length">{letterLimitObj?.usage ? policiesLimit-letterLimitObj.usage : policiesLimit}</p>
            <p className="limit">/{policiesLimit ? policiesLimit : "-"}</p>
          </div>
          <div className="reflash-timer">
            <p className="reflash-timer__desc">전체 횟수 초기화까지</p>
            <div className="reflash-timer__inner">
              <img src={IconClock} alt="clock icon 시계 아이콘" />
              <p className="timer-num">{letterLimitObj.usage !== null && letterLimitObj.ttl > 0 && !!seconds ? `${hours}:${minutes}:${sec}` : "00:00:00"}</p>
            </div>
          </div>
        </div>
        <div className="write-mode-control">
          <div className="change-btn-wrapper">
            <button onClick={handleModeChange}>
              <img src={published ? IconDiaryMode : IconLetterMode} alt={`${published ? "letter" : "diary"} 변경 아이콘 change icon`} />
              <p>{published ? "일기모드" : "편지모드"}로 변경</p>
            </button>
            <button onClick={handlePreferenceChange}>
              <img src={preference === "F" ? IconFMode : IconTMode} alt={`${preference} 변경 아이콘 change icon`} />
              <p>{preference === "F" ? "F" : "T"}답변 먼저</p>
            </button>
          </div>
          <div className="string-length">
            <p className="length">{textareaVal?.length ? textareaVal.length : "0"}</p>
            <p className="limit"> / 200</p>
          </div>
        </div>
      </div>
      <div className={`snackbar ${snackState ? "fade-in" : "fade-out"}`}><p>{published ? "편지 글은 모두가 볼 수 있어요." : "일기 글은 나만 볼 수 있어요."}</p></div>
    </div>
  )
}

function Write() {
  const navigate = useNavigate();
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [preference, setPreference] = useState(userInfo?.preference ?? "T");
  const [textareaVal, setTextareVal] = useState("");
  const [published, setPublished] = useState(true);
  const [loading, setLoading] = useState(false);
  
  const letterResponse = async () => {
    if (!userInfo?.userId || !textareaVal || !preference) return;
    setLoading(true);

    try {      
      const res = await letterResponseAPI(userInfo.userId, textareaVal, preference, published);    
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

  const writeData = { preference, setPreference, textareaVal, setTextareVal, published, setPublished, letterResponse };

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
  