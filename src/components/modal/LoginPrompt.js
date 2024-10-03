import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';

import IconClose from 'assets/Icon/icon-close-w.svg'
import ImgLoginPrompt from 'assets/Content/login-popup-img.png'


export default function LoginPrompt() {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);

  const handleClose = () => { dispatch(closeModal()); };

  return (
    <Dialog
      open={modalType === "LoginPrompt" && isOpen}
      onClose={handleClose}
      className="base-dialog-wrapper LoginPrompt"
    >      
      <div className="base-dialog-inner">
        <div className="content-wrapper">
          <img className="close-btn" onClick={handleClose} src={IconClose} alt="close btn img 닫기 버튼 이미지" />
          <img className="banner" src={ImgLoginPrompt} alt="" />
        </div>
        <button>로그인 하기</button>
      </div>
    </Dialog>
  )
}