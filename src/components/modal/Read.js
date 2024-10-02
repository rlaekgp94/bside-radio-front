import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
// import FormInput from 'components/ui/input/FormInput';

export default function Read() {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);
  const [modalState, setModalState] = useState(true);

  // const [code, setCode] = useState(null);
  // const [loading, setLoading] = useState(false);

  const handleClose = () => { dispatch(closeModal()); };

  useEffect(() => {
    history.pushState(null, null, window.location.href); // 모달 내에서 뒤로가기시 막기

    const handleBeforeUnload = (event) => { // 새로고침 시 페이지 벗어날건지 확인
      if (modalState) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [modalState]);

  return (
    <Dialog
      open={modalType === "Read" && isOpen}
      className="full-dialog-wrapper"
      disableEscapeKeyDown
    >
      <AppBar sx={{ position: 'sticky' }}>
        
      </AppBar>
      <h1>1 Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>Read</h1>
      <h1>2 Read</h1>
    </Dialog>
  )
}