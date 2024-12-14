import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { openModal } from 'store/modules/components';

import dayjs from "dayjs";
import Picker from 'react-mobile-picker'
import { Dialog, Slide } from "@mui/material";

import { getReportDailyStatusAPI, getReportWeeklyStatusAPI } from 'api/v1/reports'

import StickerDailyReport from 'assets/Content/reports/sticker-daily-report.png'
import StickerWeekReport from 'assets/Content/reports/sticker-week-report.png'
import StickerExists from 'assets/Content/reports/exists.svg'
import StickerWeekly from 'assets/Content/reports/weekly.svg'

import { EMOTION } from 'constants/emotion'



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

const getDateInfo = (dateItem, today, reportsStatus) => {
  const formattedDate = dateItem.format("YYYY-MM-DD");
  const isFutureDay = dateItem.isSame(today, "month") && dateItem.isAfter(today, "day");

  const dailyReportDate = reportsStatus?.dailyStatus?.find(item => item.date === formattedDate);
  const weeklyReportDate = reportsStatus?.weeklyStatus?.find(item => item.startDate === formattedDate);

  const isAvailableDailyReport = dailyReportDate?.available;
  const isCreatedDailyReport = dailyReportDate?.coreEmotion;
  const isCreatedWeeklyReport = !!weeklyReportDate?.analyzed;

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
  const dispatch = useDispatch();

  const openOnBoardingModal = () => {
    dispatch(openModal({modalType: "OnBoarding"}))
  }
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

  useEffect(() => {
    getReportStatusData()
  }, [currentDate])

  // useEffect(() => {
  //   console.table(reportsStatus.dailyStatus)
  //   console.table(reportsStatus.weeklyStatus)
  // }, [reportsStatus])
  
  const getReportStatusData = async () => {
    if (!userInfo?.userId) return;
    Promise.all([
      getReportDailyStatusAPI(userInfo?.userId, yearMonth),
      getReportWeeklyStatusAPI(userInfo?.userId, yearMonth)
    ]).then((res) => {
      const [dailyStatus, weeklyStatus] = res;
      setReportsStatus({dailyStatus: [
        {
            "date": "2024-09-30",
            "coreEmotion": null,
            "available": false
        },
        {
            "date": "2024-10-01",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-02",
            "coreEmotion": "혐오",
            "available": false
        },
        {
            "date": "2024-10-03",
            "coreEmotion": "분노",
            "available": false
        },
        {
            "date": "2024-10-04",
            "coreEmotion": "수용",
            "available": false
        },
        {
            "date": "2024-10-05",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-06",
            "coreEmotion": "놀라움",
            "available": false
        },
        {
            "date": "2024-10-07",
            "coreEmotion": null,
            "available": false
        },
        {
            "date": "2024-10-08",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-09",
            "coreEmotion": "중립",
            "available": false
        },
        {
            "date": "2024-10-10",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-11",
            "coreEmotion": "혐오",
            "available": false
        },
        {
            "date": "2024-10-12",
            "coreEmotion": "분노",
            "available": false
        },
        {
            "date": "2024-10-13",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-14",
            "coreEmotion": "슬픔",
            "available": false
        },
        {
            "date": "2024-10-15",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-16",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-17",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-18",
            "coreEmotion": "중립",
            "available": false
        },
        {
            "date": "2024-10-19",
            "coreEmotion": "놀라움",
            "available": false
        },
        {
            "date": "2024-10-20",
            "coreEmotion": "두려움",
            "available": false
        },
        {
            "date": "2024-10-21",
            "coreEmotion": "슬픔",
            "available": false
        },
        {
            "date": "2024-10-22",
            "coreEmotion": "슬픔",
            "available": false
        },
        {
            "date": "2024-10-23",
            "coreEmotion": null,
            "available": true
        },
        {
            "date": "2024-10-24",
            "coreEmotion": "열망",
            "available": false
        },
        {
            "date": "2024-10-25",
            "coreEmotion": "수용",
            "available": false
        },
        {
            "date": "2024-10-26",
            "coreEmotion": "열망",
            "available": false
        },
        {
            "date": "2024-10-27",
            "coreEmotion": "슬픔",
            "available": false
        },
        {
            "date": "2024-10-28",
            "coreEmotion": null,
            "available": false
        },
        {
            "date": "2024-10-29",
            "coreEmotion": "중립",
            "available": false
        },
        {
            "date": "2024-10-30",
            "coreEmotion": "기쁨",
            "available": false
        },
        {
            "date": "2024-10-31",
            "coreEmotion": null,
            "available": false
        }
    ], weeklyStatus: [
        {
            "weekOfYear": 40,
            "weekName": "2024년 10월 1주차",
            "startDate": "2024-09-30",
            "endDate": "2024-10-06",
            "totalCount": 30,
            "available": true,
            "analyzed": false
        },
        {
            "weekOfYear": 41,
            "weekName": "2024년 10월 2주차",
            "startDate": "2024-10-07",
            "endDate": "2024-10-13",
            "totalCount": 35,
            "available": true,
            "analyzed": true
        },
        {
            "weekOfYear": 42,
            "weekName": "2024년 10월 3주차",
            "startDate": "2024-10-14",
            "endDate": "2024-10-20",
            "totalCount": 35,
            "available": true,
            "analyzed": true
        },
        {
            "weekOfYear": 43,
            "weekName": "2024년 10월 4주차",
            "startDate": "2024-10-21",
            "endDate": "2024-10-27",
            "totalCount": 35,
            "available": true,
            "analyzed": false
        },
        {
            "weekOfYear": 44,
            "weekName": "2024년 10월 5주차",
            "startDate": "2024-10-28",
            "endDate": "2024-11-03",
            "totalCount": 15,
            "available": true,
            "analyzed": false
        }
    ]})
    })
  }

const handleReportNavigation = (dateItem, isAvailableDailyReport, isCreatedDailyReport, isCreatedWeeklyReport, dailyReportDate, weeklyReportDate) => {
  if (!isAvailableDailyReport && !isCreatedDailyReport && !isCreatedWeeklyReport) return;
  if (isAvailableDailyReport) { // 데일리 리포트 작성 가능 상태
    handleIsDailyReportOpen(dateItem, dailyReportDate)
  } else if (isCreatedDailyReport && isCreatedWeeklyReport) { // 데일리/주간 리포트 둘다 작성한 경우
    handleIsAllReportNavOpen(dailyReportDate, weeklyReportDate)
  } else if (isCreatedDailyReport) { // 데일리 리포트만 작성한 경우
    alert("데일리 리포트 분석 결과 화면")
  } else if (isCreatedWeeklyReport) { // 위클리 리포트만 작성한 경우
    alert("위클리 리포트 분석 결과 화면")
  }
}

  const handleIsAllReportNavOpen = (dailyReportDate, weeklyReportDate) => {
    setIsReportSelectionOpen(true);
    console.log("dailyReportDate, weeklyReportDate", dailyReportDate, weeklyReportDate)
  };

  const handleIsDailyReportOpen = (dateItem, dailyReportDate) => {
    console.log(dailyReportDate)
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
                  onClick={() => handleReportNavigation(dateItem, isAvailableDailyReport, isCreatedDailyReport, isCreatedWeeklyReport, dailyReportDate, weeklyReportDate)}
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
          <button onClick={() =>  navigate("/reports/week", { state: { year: currentDate.year(), month: currentDate.month() + 1 } })} className="week-reports-request"><p>주간 리포트 분석</p></button>
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
        onClose={() => setIsReportSelectionOpen(false)}
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

export default ReportsMain;
