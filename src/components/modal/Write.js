import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Textarea from '@mui/joy/Textarea';
import Toggle from 'components/item/Toggle'

import IconClose from 'assets/Icon/icon-close-w.svg'

export default function Write() {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);
  const [active, setActive] = useState(false); // false는 F true는 T
  const [textareaVal, setTextareVal] = useState("");

  const changeHandler = (e) => {
    const { value } = e.target;
    if (value.length <= 200) {
      setTextareVal(value);
    }
  }

  // const [code, setCode] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleClose = () => { dispatch(closeModal()); };

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
      className="full-dialog-wrapper"
      disableEscapeKeyDown
    >
      <AppBar sx={{ position: 'sticky' }} className="custom-app-bar">
        <img onClick={handleClose} src={IconClose} alt="close btn img 닫기 버튼 이미지" />
      </AppBar>
      {/* <div className="wrapper-start">
        <div id="stars01"></div>
        <div id="stars02"></div>
      </div> */}
      <div className="full-dialog-inner layout-p">
        <div className="content-head">
          <Toggle setActive={setActive} active={active} />
        </div>
        <div className="content-body">
          <div className="write-textarea-wrapper">
            <Textarea
              className="write-textarea"
              name="write-textarea"
              disabled={false}
              placeholder="편지를 써보세요"
              size="md"
              variant="plain"
              value={textareaVal}
              onChange={changeHandler}
            />
            <div className="string-length"><p>{textareaVal?.length ? textareaVal.length : "0"} / 200</p></div>
          </div>
        </div>
        <div className="content-foot">
          <button className="submit">사연 보내기</button>
        </div>
      </div>
    </Dialog>
  )
}