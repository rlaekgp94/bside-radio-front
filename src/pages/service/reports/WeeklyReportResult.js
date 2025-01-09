import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import dayjs from "dayjs";

import { createReportWeeklyAPI, getReportWeeklyResultAPI } from 'api/v1/reports'

import CloseTitleBar from 'components/common/CloseTitleBar'
import LoadingLayout from 'pages/service/loading/ReportsCreateLoading'
import { CircularProgress } from '@mui/material';

import { EMOTION } from 'constants/emotion'

import ImgNotList from 'assets/Content/memoryBox/notlist.png'
import ImgWrittenAll from 'assets/Content/reports/all-written.svg'
import ImgWrittenDiary from 'assets/Content/reports/diary-written.svg'
import ImgWrittenLetter from 'assets/Content/reports/letter-written.svg'


function WeeklyReportResult() {
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const location = useLocation();
  const navigate = useNavigate();
  const { type, startDate, endDate, year, month } = location.state || {};
  const [resultLoading, setResultLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(true);
  const [resultData, setResultData] = useState(null);

  const formatStartDate = dayjs(startDate, "YYYY-MM-DD").format("YYYY-MM-DD");
  const formatEndDate = dayjs(endDate, "YYYY-MM-DD").format("YYYY-MM-DD");

  const getEmotionInType = (emotion) => EMOTION[emotion] || null;
  
  const createReportWeekly = async () => {
    if (!userInfo?.userId) return;
    try {     
      const res = await createReportWeeklyAPI(userInfo.userId, formatStartDate);    
      setResultData(res);
    } catch(e) {
      console.log("createReportWeeklyAPI e: ", e)
    } finally {
      setCreateLoading(false);
    }
  }
  
  const getReportWeeklyResult = async () => {
    if (!userInfo?.userId) return;
    try {     
      const res = await getReportWeeklyResultAPI(userInfo.userId, formatStartDate, formatEndDate);    
      setResultData(res);
    } catch(e) {
      console.log("getReportWeeklyResultAPI e: ", e)
    } finally {
      setResultLoading(false);
    }
  }
  
  useEffect(() => {
    const handleBeforeUnload = (event) => { // 새로고침 시 페이지 벗어날건지 확인
      if (resultLoading || createLoading) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [resultLoading, createLoading]);

  useEffect(() => {
    switch (type) {
      case "create":
        if (!startDate) return navigate("/reports");
        createReportWeekly()
        break;
      case "get":
        if (!startDate || !endDate) return navigate("/reports");
        getReportWeeklyResult()
        break;
    
      default:
        break;
    }
  }, [])

  return (
    <div className="reports-weekly-result">
      <CloseTitleBar title="위클리 리포트" move={`/reports?y=${year}&m=${month}`} />
        {type === "get" && resultLoading ? <div className="loading-container"><CircularProgress size={70} /></div> : 
        type === "create" && createLoading ? <LoadingLayout type="create" /> :
        (          
          <>
          {resultData ?
            <div className="reports-weekly-result-container">
              <div className="reports-weekly-result-inner">
                <div className="result-core-title">
                  <p className="week-name">{resultData.weekName}</p>
                  <p className="start-end-date">{`${resultData.startDate} ~ ${resultData.endDate}`}</p>
                </div>
                <ul className="emotion">
                  {resultData.coreEmotions?.length ? resultData.coreEmotions.map((item, index) => (
                    <img className="emotion-img" key={index} src={getEmotionInType(item).stickerBg} alt={`${item} 감정 스티커 이미지`} />)
                  ) : <img className="emotion-img" src={getEmotionInType("없음").stickerBg} alt={`감정 없음 스티커 이미지`} />}
                </ul>
                <div className="result-desc">
                  <p className="result-desc__days">이번주도 정말 힘냈어요!</p>
                  <p className="result-desc__topic">{resultData.cheerUp}</p>
                </div>
                <ul className="written-wrapper">
                  <li>
                    <img src={ImgWrittenLetter} alt="편지 작성 이미지" />
                    <div className="desc">
                      <p>편지작성</p>
                      <span>{resultData.published ? resultData.published : "0"}회</span>
                    </div>
                  </li>
                  <li>
                    <img src={ImgWrittenDiary} alt="일기 작성 이미지" />
                    <div className="desc">
                      <p>일기작성</p>
                      <span>{resultData.unPublished ? resultData.unPublished : "0"}회</span>
                    </div>
                  </li>
                  <li>
                    <img src={ImgWrittenAll} alt="전체 작성 이미지" />
                    <div className="desc">
                      <p>전체</p>
                      <span>{(resultData.published ?? 0) + (resultData.unPublished ?? 0)}회</span>
                    </div>
                    </li>
                </ul>
              </div>
            </div> : 
            <div className="not-list">
              <img className="rabbit" src={ImgNotList} alt="not list 리스트 없음 이미지" />
              <div className="not-list__desc">
                <p>리포트를 불러올 수 없어요.</p>
              </div>
            </div>}
          </>      
        )}          
    </div>
  )
}

export default WeeklyReportResult;