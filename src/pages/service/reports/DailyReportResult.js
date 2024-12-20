import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import dayjs from "dayjs";

import { createReportDailyAPI, getReportDailyResultAPI } from 'api/v1/reports'

import CloseTitleBar from 'components/common/CloseTitleBar'
import LoadingLayout from 'pages/service/loading/ReportsCreateLoading'
import { CircularProgress } from '@mui/material';

import { EMOTION } from 'constants/emotion'

import ImgNotList from 'assets/Content/memoryBox/notlist.png'

function DailyReportResult() {
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const location = useLocation();
  const navigate = useNavigate();
  const { type, year, month, day } = location.state || {};
  const [resultLoading, setResultLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(true);
  const [resultData, setResultData] = useState(null);
  const date = dayjs(new Date(`${year}-${month}-${day}`)).format("YYYY-MM-DD");

  const getEmotionInType = (emotion) => EMOTION[emotion] || null;
  
  const createReportDaily = async () => {
    if (!userInfo?.userId) return;
    try {     
      const res = await createReportDailyAPI(userInfo.userId, date);    
      setResultData(res);
    } catch(e) {
      console.log("createReportDailyAPI e: ", e)
    } finally {
      setCreateLoading(false);
    }
  }
  
  const getReportDailyResult = async () => {
    if (!userInfo?.userId) return;
    try {     
      const res = await getReportDailyResultAPI(userInfo.userId, date);    
      setResultData(res);
    } catch(e) {
      console.log("getReportDailyResultAPI e: ", e)
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
    if (!year || !month || !day) {
      navigate("/reports")
      return;
    }
    switch (type) {
      case "create":
        createReportDaily()
        break;
      case "get":
        getReportDailyResult()
        break;
    
      default:
        break;
    }
  }, [])

  return (
    <div className="reports-daily-result">
      <CloseTitleBar title="데일리 리포트" />
        {type === "get" && resultLoading ? <div className="loading-container"><CircularProgress size={70} /></div> : 
        type === "create" && createLoading ? <LoadingLayout type="create" /> :
        (
          <>
            {resultData ?             
            <div className="reports-daily-result-container">
              <div className="reports-daily-result-inner">
                <div className="result-core-title">
                  {resultData?.dailyCoreEmotion ? 
                  <img className="core-emotion-img" src={getEmotionInType(resultData.dailyCoreEmotion).stickerMain} alt={`${resultData.dailyCoreEmotion} 감정 스티커 이미지`} /> :
                  <img className="core-emotion-img" src={getEmotionInType("없음").stickerBg} alt={`감정 없음 스티커 이미지`} />}
                  <p className="date">{`${year}년 ${month}월 ${day}일`}</p>
                </div>
                <ul className="letter-analyses">
                  {resultData.letterAnalyses?.length && resultData.letterAnalyses.map((item, index) => {
                    return <li key={item.letterId} className="letter-analyses__item">
                      {item.coreEmotions?.length ? <img src={getEmotionInType(item.coreEmotions[0]).stickerBg} alt={`${item.coreEmotions[0]} 감정 스티커 이미지`} /> :
                      <img className="emotion-img" src={getEmotionInType("없음").stickerBg} alt={`감정 없음 스티커 이미지`} />}
                      <div className="letter-desc">
                        <p className="index">#{index+1} 사연</p>
                        <p className="topic">{item.topic}</p>
                      </div>
                    </li>
                  })}
                </ul>
                <div className="result-desc">
                  <p className="result-desc__days">오늘은...</p>
                  <p className="result-desc__topic">{resultData.description}</p>
                </div>
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

export default DailyReportResult;