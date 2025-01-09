import React, { useRef, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import dayjs from "dayjs";

import { getReportWeeklyStatusAPI } from 'api/v1/reports'

import GoBackTitleBar from 'components/common/GoBackTitleBar';
import SelectedCheckItem from 'assets/Content/reports/check.svg'
import LoadingLayout from 'pages/service/loading/ReportsCreateLoading'
import { CircularProgress } from '@mui/material';

import ImgNotList from 'assets/Content/memoryBox/notlist.png'


// 생성 가능 여부(available)
// 생성 여부(analyzed)

function WeekListLayout({ year, month }) {
  const navigate = useNavigate();
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [list, setList] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [selectedWeekItem, setSelectedWeekItem] = useState(null);

  const getReportWeeklyStatus = async () => {
    if (!userInfo?.userId || !year || !month) return;

    const date = dayjs(new Date(`${year}-${month}`)).format("YYYY-MM");
    const MIN_LOADING_TIME = 800; // 최소 로딩 시간 (ms)
    const startTime = Date.now(); // 시작 시간 기록

    try {     
      const res = await getReportWeeklyStatusAPI(userInfo.userId, date);  
      const availableList = res.filter(item => item.available);
      setList(availableList);
    } catch(e) {
      console.log("letterResponseAPI e: ", e)
    } finally {
      const elapsedTime = Date.now() - startTime; // 경과 시간 계산
      const remainingTime = Math.max(MIN_LOADING_TIME - elapsedTime, 0);

      setTimeout(() => {
        setListLoading(false);
      }, remainingTime);
    }
  }

  useEffect(() => {
    getReportWeeklyStatus()
  }, [])

  
  const handleSelect = (item) => {
    setSelectedWeekItem((prev) => (prev?.weekOfYear === item.weekOfYear ? null : item));
  };

  const handleRequest = () => {
    if (!selectedWeekItem) return;
    navigate("/reports/weekly-result", { state: {
      year,
      month,
      startDate: selectedWeekItem.startDate,
      type: "create"
    }})
  }

  return (
    <div className="reports-week__wrapper">
      <GoBackTitleBar title="주간 리포트" />
      <div className="reports-week__wrapper--inner layout-p">
        <p className="date-title">{year ? year : "-"}년 {month ? month : "-"}월</p>
        {listLoading ? <LoadingLayout type="get" /> : list?.length ? 
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
  const weekData = { year, month };

  useEffect(() => {
    if (!year || !month) {
      navigate("/reports")
    }
  }, [])

  return (
    <div className="reports-week">   
      <WeekListLayout {...weekData} />
    </div>
  );
};

export default WeekReports;
