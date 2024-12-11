import React, { useRef, useEffect, useState } from "react";

import dayjs from "dayjs";
import Picker from 'react-mobile-picker'
import { Dialog, Slide } from "@mui/material";

import StickerDailyReport from 'assets/Content/reports/sticker-daily-report.png'
import StickerWeekReport from 'assets/Content/reports/sticker-week-report.png'


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const YearMonthPicker = ({open, onClose, currentDate, setCurrentDate}) => {
  const [pickerValue, setPickerValue] = useState({
    years: currentDate?.year(),
    months: currentDate?.month() + 1
  })
  
  const selections = {
    years: Array.from({ length: 5 }, (_, i) => 2020 + i), 
    months: Array.from({ length: 12 }, (_, i) => i + 1)
  }
  
  const handleConfirm = () => {
    setCurrentDate(dayjs().year(pickerValue?.years).month(pickerValue?.months - 1).date(1));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}
      TransitionComponent={Transition}
      aria-describedby="year-month-selection-description"
      className="bottom-dialog">        
        <div className="year-month-selection">
          <Picker wheelMode="normal" value={pickerValue} height={171} onChange={setPickerValue} className="year-month-selection__picker">
            {Object.keys(selections).map(name => {
              return <Picker.Column key={name} name={name} className="picker-column">
                {selections[name].map(option => (                    
                  <Picker.Item key={option} value={option} className="picker-item">
                    {({ selected }) => (
                      <div
                        style={{
                          color: selected ? "#000" : "#C8C8CD",
                          backgroundColor: selected ? "#F5F5FA" : null,
                          padding: "4px 0",
                          borderRadius: "4px",
                          width: "100%"
                        }}
                      >
                        {option}{name === "months" ? "월" : ""}
                      </div>
                    )}
                  </Picker.Item>
                ))}
              </Picker.Column>
            })}
          </Picker>
          <button onClick={handleConfirm} className="active-btn">변경하기</button>
        </div>
    </Dialog>
  );
};

function Reports() {
  const [currentDate, setCurrentDate] = useState(dayjs(new Date()));
  const [startX, setStartX] = useState(null);
  const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
  const [isReportSelectionOpen, setIsReportSelectionOpen] = useState(false);
  const [isYearMonthPickerOpen, setIsYearMonthPickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState({
    year: null,
    month: null,
    day: null,
  });

  const handleIsDailyReportOpen = (dateItem) => {
    setIsDailyReportOpen(true);
    setSelectedDate({
      year: dateItem.year(),
      month: dateItem.month() + 1,
      day: dateItem.date(),
    });
  };

  const handleIsDailyReportClose = () => {
    setIsDailyReportOpen(false);
    setSelectedDate({
      year: null,
      month: null,
      day: null,
    })
  };

  // 월간 날짜 계산
  const year = currentDate.year();
  const month = currentDate.month();
  const firstDayOfMonth = dayjs(new Date(year, month, 1));
  const lastDayOfMonth = dayjs(new Date(year, month + 1, 0));
  const firstDateInCalendar = firstDayOfMonth.startOf("week");
  const lastDateInCalendar = lastDayOfMonth.endOf("week");

  const dates = [];
  let date = firstDateInCalendar;
  while (date.isBefore(lastDateInCalendar) || date.isSame(lastDateInCalendar)) {
    dates.push(date);
    date = date.add(1, "day");
  }

  // 드래그 이벤트 핸들러
  const handleTouchStart = (e) => {
    setStartX(e.touches[0].clientX); // 터치 시작 지점
  };

  const handleTouchEnd = (e) => {
    if (!startX) return;
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    const today = dayjs();
    const nextMonth = currentDate.add(1, "month");
    const limitDate = today.subtract(10, "month"); // 10개월 이전 제한

    if (diff > 50 && !currentDate.isBefore(limitDate, "month")) {
      // 이전 달 (10개월 이전 제한)
      setCurrentDate(currentDate.subtract(1, "month"));
    } else if (diff < -50 && !nextMonth.isAfter(today, "month")) {
      // 다음 달 (현재 달 이후로 넘어가지 않도록 제한)
      setCurrentDate(nextMonth);
    }

    setStartX(null);
  };

  return (
    <div className="reports">  
      <div className="reports__calendar"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="date-switcher">
          <button onClick={() => setIsYearMonthPickerOpen(true)} className="date-change-btn">{currentDate.format("YYYY. MM")}</button>
        </div>
        <div className="calendar-body">
          <div className="weekdays">
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <p key={day}>{day}</p>
            ))}
          </div>
          <div className="days-wrapper">
            {dates.map((dateItem, index) => {
              const today = dayjs();
              const isFutureDay = dateItem.isSame(today, "month") && dateItem.isAfter(today, "day");
              return <div key={index} 
              onClick={() => handleIsDailyReportOpen(dateItem)}
              className={[
                "days-inner",
                !dateItem.isSame(currentDate, "month") && "outside",
                dateItem.isSame(dayjs(), "day") && "today",
                isFutureDay && "future",
              ]
                .filter(Boolean) 
                .join(" ")}
              >
                <p className="day">{dateItem.date()}</p>
              </div>
            })}
          </div>
        </div>
        <div className="info">
          <button className="onboarding-btn"></button>
          <button className="week-reports-request"><p>주간 리포트 분석</p></button>
        </div>
      </div>
      <Dialog
        open={isDailyReportOpen}
        TransitionComponent={Transition}
        onClose={handleIsDailyReportClose}
        aria-describedby="daily-report-analysis-description"
        className="bottom-dialog"
      >
        <div className="daily-report-analysis">
          <div className="daily-report-analysis__title">
            <p>{selectedDate?.month ? selectedDate?.month : "-"}월 {selectedDate?.day ? selectedDate?.day: "-"}일</p>
            <span>데일리 리포트 분석을 시작할까요?</span>
          </div>
          <button className="active-btn">분석 시작</button>
        </div>
      </Dialog>
      <Dialog
        open={isReportSelectionOpen}
        TransitionComponent={Transition}
        onClose={null}
        aria-describedby="report-selection-description"
        className="bottom-dialog"
      >
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
      <YearMonthPicker open={isYearMonthPickerOpen} onClose={() => setIsYearMonthPickerOpen(false)} currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
};

export default Reports;
