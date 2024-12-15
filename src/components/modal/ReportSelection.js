import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectModal, closeModal } from 'store/modules/components';

import StickerDailyReport from 'assets/Content/reports/sticker-daily-report.png'
import StickerWeekReport from 'assets/Content/reports/sticker-week-report.png'

import { Dialog, Slide } from "@mui/material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ReportSelection() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { modalType, isOpen, data } = useSelector(selectModal);
  const { dailyReportDate, weeklyReportDate } = data;
  console.log("dailyReportDate, weeklyReportDate", dailyReportDate, weeklyReportDate)

  const handleClose = () => { dispatch(closeModal()); };

  return (
    <Dialog open={modalType === "ReportSelection" && isOpen} onClose={handleClose}
      closeAfterTransition={false}
      TransitionComponent={Transition}     
      disableRestoreFocus 
      aria-describedby="report-selection-description"
      className="bottom-dialog">
      <div className="report-selection">
        <div className="report-selection__title">
          <p>리포트 선택</p>
          <span>열람할 리포트를 선택해 주세요</span>
        </div>
        <div className="report-selection__choice">
          <div className="btn-container daily">
            <img src={StickerDailyReport} alt="데일리 리포트 이미지" />
            <div className="btn-container__title">
              <p>데일리 리포트</p>
              <ul>
                <li>오늘 작성한</li>
                <li>리포트를 열람해요</li>
              </ul>
            </div>
          </div>
          <div className="btn-container week">
            <img src={StickerWeekReport} alt="주간 리포트 이미지" />
            <div className="btn-container__title">
              <p>주간 리포트</p>
              <ul>
                <li>이번주에 작성한</li>
                <li>리포트를 열람해요</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  )
}