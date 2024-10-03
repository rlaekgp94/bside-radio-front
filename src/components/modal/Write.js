import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { selectModal, closeModal } from 'store/modules/components';

import { letterResponseAPI } from 'api/v1/letters'

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import TypeToggle from 'components/item/TypeToggle'

import IconClose from 'assets/Icon/icon-close-p.svg'
import RabbitImg from 'assets/Content/letter-write-rabbit-top.png'

export default function Write() {
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);
  const [active, setActive] = useState(false); // false는 F true는 T
  const [textareaVal, setTextareVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const changeHandler = (e) => {
    const { value } = e.target;
    if (value.length <= 200) {
      setTextareVal(value);
    }
  }

  const handleClose = () => { dispatch(closeModal()); };

  useEffect(() => {
    console.log("loading: ", loading);
  }, [loading])
  
  const letterResponse = async () => {
    const preference = active ? "T" : "F";
    if (!textareaVal || !preference) return;
    console.log(1)
    setLoading(true);

    try {      
      // const res = await letterResponseAPI(email, textareaVal, preference);    
      const res = {
        message_t: `1. ${textareaVal}`,
        message_f: `2. ${textareaVal}`
      }
      setTimeout(() => {
        nav("/result", { state: { resultData: res, preference } });
        handleClose()
      }, 5000);
    } catch(e) {
      console.log("e: ", e)
      setError(true);
    }
  }

  useEffect(() => {
    history.pushState(null, null, window.location.href); // 모달 내에서 뒤로가기시 막기

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

  return (
    <Dialog
      open={modalType === "Write" && isOpen}
      className="full-dialog-wrapper Write"
      disableEscapeKeyDown
    >
      {loading ? 
        <div>loading</div> :
        <>
          <AppBar sx={{ position: 'sticky' }} className="custom-app-bar">
            <img onClick={handleClose} src={IconClose} alt="close btn img 닫기 버튼 이미지" />
          </AppBar>
          <div className="full-dialog-inner layout-p">
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
                  autoComplete="off"
                  id="write-textarea"
                  className="write-textarea"
                  name="write-textarea"
                  placeholder="편지를 써보세요..."
                  value={textareaVal}
                  onChange={changeHandler}
                />
                <div className="string-length"><p>{textareaVal?.length ? textareaVal.length : "0"} / 200</p></div>
              </div>
            </div>
            <div className="content-foot">
              <button className="submit" onClick={letterResponse}>사연 보내기</button>
            </div>
          </div>
        </>
        }
    </Dialog>
  )
}