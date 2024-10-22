import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';


export default function Coming() {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);
  
  const handleClose = () => { dispatch(closeModal()); };
  
  return (
    <Dialog
      open={modalType === "Coming" && isOpen}
      className="base-dialog-wrapper Coming"
    >      
      <div className="base-dialog-inner">
        <div className="info">
          <p className="info__title">준비중입니다!</p>
          <ul className="info__desc">
            <li>DJ의 소개 페이지를 준비중입니다.</li>
            <li>추후 업데이트를 기대해주세요!</li>
          </ul>
        </div>
        <button onClick={handleClose}>확인</button>
      </div>
    </Dialog>
  )
}