import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectModal, closeModal } from 'store/modules/components';

import { Dialog, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DailyReport() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalType, isOpen, data } = useSelector(selectModal);
  const { selectedDate } = data;

  const handleClose = () => { dispatch(closeModal()); };

  const nav = () => {
    handleClose()
    navigate("/reports/daily-result", { state: {
      year: selectedDate.year,
      month: selectedDate.month,
      day: selectedDate.day,
      type: "create"
    }})
  }

  return (
    <Dialog
    open={modalType === "DailyReport" && isOpen} onClose={handleClose}
      closeAfterTransition={false}
      TransitionComponent={Transition}     
      disableRestoreFocus 
      aria-describedby="daily-report-analysis-description"
      className="bottom-dialog">
      <div className="daily-report-analysis">
        <div className="daily-report-analysis__title">
          <p>{selectedDate?.month ? selectedDate?.month : "-"}월 {selectedDate?.day ? selectedDate?.day: "-"}일</p>
          <span>데일리 리포트 분석을 시작할까요?</span>
        </div>
        <button onClick={nav} className="active-btn">분석 시작</button>
      </div>
    </Dialog>
  )
}