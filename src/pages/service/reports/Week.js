import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { getWeeklyReportCreationStatusAPI } from 'api/v1/reports'

import GoBackTitleBar from 'components/common/GoBackTitleBar';
import SelectedCheckItem from 'assets/Content/reports/chack.svg'

import LoadingLayout from 'pages/service/loading/ReportsCreateLoading'
import ImgNotList from 'assets/Content/memoryBox/notlist.png'

// 생성 가능 여부(available)
// 생성 여부(analyzed)
const mock = [
  {
      "weekOfYear": 46,
      "weekName": "2024년 11월 1주차",
      "startDate": "2024-11-01",
      "endDate": "2024-11-07",
      "totalCount": 0,
      "available": false,
      "analyzed": false
  },
  {
      "weekOfYear": 47,
      "weekName": "2024년 11월 2주차",
      "startDate": "2024-11-08",
      "endDate": "2024-11-15",
      "totalCount": 0,
      "available": false,
      "analyzed": false
  },
  {
      "weekOfYear": 48,
      "weekName": "2024년 11월 3주차",
      "startDate": "2024-11-25",
      "endDate": "2024-12-01",
      "totalCount": 0,
      "available": false,
      "analyzed": false
  },
  {
      "weekOfYear": 49,
      "weekName": "2024년 11월 4주차",
      "startDate": "2024-12-02",
      "endDate": "2024-12-08",
      "totalCount": 0,
      "available": false,
      "analyzed": false
  },
]

/**
 * 
  **sticker**
  surprise // 놀람
  acceptance // 수용
  anger // 분노
  desire // 욕망
  disgust // 혐오
  empty  // 공허
  fear // 두려움
  joy // 기쁨
  neutrality // 중립
  sadness // 슬픔
 */
function WeekListLayout({ year, month, setLoading }) {
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [list, setList] = useState(mock);
  const [selectedWeekItem, setSelectedWeekItem] = useState({});

  const getWeeklyReportCreationStatus = async () => {
    if (!userInfo?.userId || !year || !month) return;
    // setLoading(true);
    const date = `${year}-10-01`
    try {     
      const response = await fetch(`https://dev.upup-radio.site/api/v1/reports/weekly/status?date=${date}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({userId: userInfo.userId}), // Body 추가
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Response data:", data);
      // const res = await getWeeklyReportCreationStatusAPI(userInfo.userId, date);    
      // console.log("res: ", res)
      // // navigate("/result", { state: { resultData: res, preference } });
    } catch(e) {
      console.log("letterResponseAPI e: ", e)
      // setLoading(false);
    }
  }

  useEffect(() => {
    getWeeklyReportCreationStatus()
  }, [])

  
  const handleSelect = (item) => {
    setSelectedWeekItem((prev) => (prev?.weekOfYear === item.weekOfYear ? null : item));
  };

  const handleRequest = () => {
    if (!selectedWeekItem) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);      
    }, 4000);
  }

  return (
    <div className="reports-week__wrapper">
      <GoBackTitleBar title="주간 리포트" />
      <div className="reports-week__wrapper--inner layout-p">
        <p className="date-title">{year ? year : "-"}년 {month ? month : "-"}월</p>
        {list?.length ? 
        <ul className="list-container">
          {list.map(item => (
            <li key={item.weekOfYear} 
              onClick={() => handleSelect(item)} 
              className={`list-item ${selectedWeekItem?.weekOfYear === item.weekOfYear ? "isSelected" : ""}`}>           
              <div className="desc">
                <p className="desc-weekName">{item?.weekName ? item.weekName : "-"}</p>
                {item?.startDate && item?.endDate ? <span className="desc-date">{`${item.startDate} ~ ${item.endDate}`}</span> : null}
              </div>
              {selectedWeekItem?.weekOfYear === item.weekOfYear && <img className="isSeiected-item" src={SelectedCheckItem} alt="선택된 아이템 체크 이미지" />}
            </li>
          ))}
        </ul> : <div className="not-list">
          <img className="rabbit" src={ImgNotList} alt="not list 리스트 없음 이미지" />
          <div className="not-list__desc">
            <p>아직 생성할 수 있는 리포트가 없어요.</p>
          </div>
        </div>}
      </div>      
      <div className="reports-week__wrapper--foot">        
        <button onClick={handleRequest} disabled={!selectedWeekItem} className="request-btn">분석 시작</button>
      </div>
    </div>
  )
}

function WeekReports() {
  const navigate = useNavigate();
  const location = useLocation();
  const { year, month } = location.state || {};
  const [loading, setLoading] = useState(false);

  const weekData = { year, month, setLoading };

  useEffect(() => {
    const handleBeforeUnload = (event) => { // 새로고침 시 페이지 벗어날건지 확인
      if (loading) {
        event.preventDefault();
        event.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [loading]);

  useEffect(() => {
    if (!year || !month) {
      navigate("/reports")
    }
  }, [])

  return (
    <div className="reports-week">     
      {loading ? 
        <LoadingLayout type="create" /> :
        <WeekListLayout {...weekData} />
      }
    </div>
  );
};

export default WeekReports;
