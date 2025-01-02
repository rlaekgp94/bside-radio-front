import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from 'store/modules/components';

import dayjs from "dayjs";
import Picker from 'react-mobile-picker'
import { Dialog, Slide } from "@mui/material";

import { getReportDailyStatusAPI, getReportWeeklyStatusAPI } from 'api/v1/reports'

import { EMOTION } from 'constants/emotion'
import StickerExists from 'assets/Content/reports/exists.svg'
import StickerWeekly from 'assets/Content/reports/weekly.svg'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const YearMonthPickerModal = ({open, onClose, currentDate, setCurrentDate}) => {
  const [pickerValue, setPickerValue] = useState({
    years: currentDate?.year(),
    months: currentDate?.month() + 1
  })
  
  const selections = {
    years: Array.from({ length: 5 }, (_, i) => 2021 + i), 
    months: Array.from({ length: 12 }, (_, i) => i + 1)
  }
  
  const handleConfirm = () => {
    const isSameDate =
      pickerValue.years === currentDate?.year() &&
      pickerValue.months === currentDate?.month()+1;

    if (isSameDate) {
      onClose();
      return;
    }

    setCurrentDate(dayjs().year(pickerValue?.years).month(pickerValue?.months - 1).date(1));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}
      closeAfterTransition={false}
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

const getDateInfo = (dateItem, today, reportsStatus) => {
  const formattedDate = dateItem.format("YYYY-MM-DD");
  const isFutureDay = dateItem.isSame(today, "month") && dateItem.isAfter(today, "day");

  const dailyReportDate = reportsStatus?.dailyStatus?.find(item => item.date === formattedDate);
  const weeklyReportDate = reportsStatus?.weeklyStatus?.find(item => item.startDate === formattedDate);

  const isAvailableDailyReport = dailyReportDate?.available;
  const isCreatedDailyReport = dailyReportDate?.coreEmotion;
  const isCreatedWeeklyReport = weeklyReportDate?.analyzed;

  return {
    formattedDate,
    isFutureDay,
    isAvailableDailyReport,
    isCreatedDailyReport,
    isCreatedWeeklyReport,
    dailyReportDate,
    weeklyReportDate,
  };
};

function ReportsMain() {
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const openOnBoardingModal = () => { dispatch(openModal({modalType: "OnBoarding"})) }
  const searchParams = new URLSearchParams(location.search);
  const paramY = searchParams.get("y");
  const paramM = searchParams.get("m");
  const defaultDate = (paramY && paramM) ? dayjs(`${paramY}-${paramM}-01`) : dayjs();
  const [currentDate, setCurrentDate] = useState(defaultDate);
  const [startX, setStartX] = useState(null);
  const [isYearMonthPickerOpen, setIsYearMonthPickerOpen] = useState(false);
  const [reportsStatus, setReportsStatus] = useState({});

  // 월간 날짜 계산
  const year = currentDate.year();
  const month = currentDate.month();
  const yearMonth = currentDate.format("YYYY-MM");
  
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
  
  const getEmotionInType = (emotion) => EMOTION[emotion] || null;

  // URL 변경 시 `currentDate` 업데이트
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const y = searchParams.get("y");
    const m = searchParams.get("m");

    // URL의 값과 currentDate를 비교하여 업데이트
    if (y && m && (year !== Number(y) || month + 1 !== Number(m))) {
      setCurrentDate(dayjs(`${y}-${m}-01`));
    }
  }, [location.search]);

  // `currentDate` 변경 시 URL 업데이트
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const y = searchParams.get("y");
    const m = searchParams.get("m");

    // URL 값과 `currentDate`가 다를 때만 URL 업데이트
    if (y !== `${year}` || m !== `${month + 1}`) {
      navigate(`/reports?y=${year}&m=${month + 1}`, { replace: true });
    }

    getReportStatusData();
  }, [currentDate]);
  
  const getReportStatusData = async () => {
    if (!userInfo?.userId) return;
    Promise.all([
      getReportDailyStatusAPI(userInfo?.userId, yearMonth),
      getReportWeeklyStatusAPI(userInfo?.userId, yearMonth)
    ]).then((res) => {
      const [dailyStatus, weeklyStatus] = res;
      setReportsStatus({ dailyStatus, weeklyStatus })
    })
  }

  const handleReportNavigation = (dateItem, isAvailableDailyReport, isCreatedDailyReport, isCreatedWeeklyReport, weeklyReportDate) => {
    if (!dateItem.isSame(currentDate, "month") && !isAvailableDailyReport && !isCreatedDailyReport && !isCreatedWeeklyReport) return;
    if (isAvailableDailyReport) { // 데일리 리포트 작성 가능 상태      
      dispatch(openModal({modalType: "DailyReport", data: { selectedDate: {
        year: dateItem.year(),
        month: dateItem.month() + 1,
        day: dateItem.date(),
      } }}))
    } else if (isCreatedDailyReport && isCreatedWeeklyReport) { // 데일리/주간 리포트 둘다 작성한 경우
      dispatch(openModal({ modalType: "ReportSelection", data: { dateItem: { 
        year: dateItem.year(),
        month: dateItem.month() + 1,
        day: dateItem.date() }, weeklyReportDate }}))
    } else if (isCreatedDailyReport) { // 데일리 리포트만 작성한 경우
      navigate("/reports/daily-result", { state: {
        year: dateItem.year(),
        month: dateItem.month() + 1,
        day: dateItem.date(),
        type: "get"
      }})
    } else if (isCreatedWeeklyReport) { // 위클리 리포트만 작성한 경우
      navigate("/reports/weekly-result", { state: {
        startDate: weeklyReportDate?.startDate,
        endDate: weeklyReportDate?.endDate,
        type: "get"
      }})
    }
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
          <button onClick={() => setIsYearMonthPickerOpen(true)} className="date-change-btn"><p className="date-str">{currentDate.format("YYYY. MM")}</p></button>
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
              const {
                isFutureDay, // 아직 오지 않은 날짜
                isAvailableDailyReport, // 데일리 리포트 생성 가능
                isCreatedDailyReport, // 데일리 리포트 생성 됨
                isCreatedWeeklyReport, // 위클리 리포트 생성 됨                
                dailyReportDate,
                weeklyReportDate,
              } = getDateInfo(dateItem, today, reportsStatus);

              const classNames = [
                "days-inner",
                !dateItem.isSame(currentDate, "month") && "outside", // 해당 월이 아닌 경우
                dateItem.isSame(today, "day") && "today", // 오늘 날
                isFutureDay && "future", // 아직 오지 않은 날짜
                (isCreatedDailyReport || isAvailableDailyReport) && "exists", // 데일리 리포트 생성이 되어있을때/생성 가능 할때
                isCreatedWeeklyReport && "existsWeekly" // 위클리 리포트 생성이 되어있을때
              ].filter(Boolean).join(" ");

              return (
                <div
                  key={index}
                  onClick={() => handleReportNavigation(dateItem, isAvailableDailyReport, isCreatedDailyReport, isCreatedWeeklyReport, weeklyReportDate)}
                  className={classNames}
                >
                  {(isAvailableDailyReport || isCreatedDailyReport) && 
                  <div className="sticker-container">
                    {isAvailableDailyReport && (
                      <img className="daily-available" src={StickerExists} alt="데일리 리포트 생성 가능 스티커 이미지" />
                    )}
                    {isCreatedDailyReport && (
                      <img
                        className="daily-created"
                        src={getEmotionInType(dailyReportDate?.coreEmotion)?.sticker}
                        alt={`${dailyReportDate?.coreEmotion} 스티커 이미지`}
                      />
                    )}
                  </div>}
                    {isCreatedWeeklyReport && (
                      <img
                        className="weekly-created"
                        src={StickerWeekly}
                        alt={`주간 리포트 생성됨 스티커 이미지`}
                      />
                    )}
                  <p className="day">{dateItem.date()}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div className="info">
          <button onClick={openOnBoardingModal} className="onboarding-btn"></button>
          <button onClick={() =>  navigate("/reports/analyzable-weekly-list", { state: { year: currentDate.year(), month: currentDate.month() + 1 } })} className="week-reports-request"><p>주간 리포트 분석</p></button>
        </div>
      </div>
      <YearMonthPickerModal open={isYearMonthPickerOpen} onClose={() => setIsYearMonthPickerOpen(false)} currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  );
};

export default ReportsMain;
