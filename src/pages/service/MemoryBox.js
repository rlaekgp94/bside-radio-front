import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openModal } from 'store/modules/components';
import { getUserMemoryListAPI } from 'api/v1/letters'

import Picker from 'react-mobile-picker'
import dayjs from "dayjs";

import { Dialog, Slide, Skeleton } from "@mui/material";

import StampT from 'assets/Content/memoryBox/stamp_t.svg'
import StampF from 'assets/Content/memoryBox/stamp_f.svg'
import StampDiary from 'assets/Content/memoryBox/stamp_diary.svg'
import ImgNotList from 'assets/Content/memoryBox/notlist.png'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" height={20} width="90%" style={{ marginBottom: 6 }} />
      <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" height={20} width="60%" />
    </div>
  )
}

const tabItems = [
  {
    title: "전체",
    id: "all",
    published: null
  },
  {
    title: "편지",
    id: "letter",
    published: true
  },
  {
    title: "일기",
    id: "diary",
    published: false
  },
]

const formattedDates = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}. ${month}. ${day}`;

  return formattedDate;
}

const YearPicker = ({open, onClose, currentDate, setCurrentDate}) => {
  const [pickerValue, setPickerValue] = useState({ years: currentDate })  
  const selections = { years: Array.from({ length: 5 }, (_, i) => 2021 + i) }
  const handleConfirm = () => {
    setCurrentDate(pickerValue?.years);
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


function MemoryBox() {  
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [currentDate, setCurrentDate] = useState(dayjs()?.year());
  const [tab, setTab] = useState(tabItems[0])
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState([])
  const [filterList, setFilterList] = useState({});
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(null);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const dispatch = useDispatch();

  const openReadModal = (item) => {
    if (!item) return;
    dispatch(openModal({modalType: "Read", data: { item }}))
  }

  const filterAndGroupByMonth = (content) => {  
    if (!Object.values(content)?.length) return;
    const newList = content
      .filter((item) => {
        const year = new Date(item.createdAt).getFullYear();

        return year === currentDate;
      })
      .reduce((acc, item) => {
        const month = new Date(item.createdAt).toISOString().slice(0, 7);
        (acc[month] ||= []).push(item);
        return acc;
      }, {});
    setFilterList(newList)
  }

  useEffect(() => {
    filterAndGroupByMonth(list)
  }, [list.length])
  
  useEffect(() => {
    if (page > 0) {
      pushLetterList(page)
    }
  }, [page]);

  useEffect(() => {
    getLetterList()
    document.getElementById('scrollbar').scrollTo(0, 0);
    setPage(0)
    setCount(null)
  }, [currentDate, tab])

  const getLetterList = async () => {
    if (!userInfo?.userId) return;
    setLoading(true)
    const published = tab.published !== null ? JSON.stringify(tab.published) : null
    try {
      const res = await getUserMemoryListAPI(userInfo.userId, currentDate.toString(), 0, published);
      setList(res?.content)
      setFilterList(res?.content)
      setCount(res?.totalPages)
      filterAndGroupByMonth(res?.content)
    } catch(e) {
      console.log("e: ", e);
    } finally {
      setLoading(false);
    }
  }

  const pushLetterList = async (page) => {
    const published = tab.published !== null ? JSON.stringify(tab.published) : null
    try {
      const res = await getUserMemoryListAPI(userInfo.userId, currentDate.toString(), page, published)
      setList(prevState => [...prevState, ...res?.content]);
    } catch (e) {
      console.log("e: ", e);
    } finally {
    }
  }

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prevPage) => {
        if (prevPage === count) return prevPage;
        return prevPage + 1;
      });
    }
  };

  useEffect(() => {
    if (!list?.length) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [count]);
  
  return (
    <div className="memorybox">
      <div className="memorybox__head">
        <div className="date-switcher">
          <button className="date-change-btn" onClick={() => setIsYearPickerOpen(true)}><p className="date-str">{currentDate}</p></button>  
        </div>
        <ul className="tab-switcher">{tabItems.map((item, index) => {
          return <li key={index} onClick={() => setTab(item)} 
            className={`tab-switcher-item ${item.id} ${tab?.id === item.id ? 'isActive' : ''}`}>
              <div className="icon-set"></div>
              {tab?.id === item.id && <p>{item.title}</p>}
            </li>
          })}
        </ul>
      </div>
      
      {loading ? (
        <div className="memorybox__body minHeight">
          <div className="box-group">
            {Array.from(new Array(10)).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {Object.values(filterList)?.length ? (
            <div className={`memorybox__body ${!Object.values(filterList)?.length ? "minHeight" : ""}`}>
              {Object.entries(filterList)
                .sort((a, b) => (a[0] < b[0] ? 1 : -1))
                .map(([month, items], index) => {   
                  if (!items.length) return null;
                  return <div key={month} className={`box-group ${index > 0 ? "line" : ""}`}>
                    <p className="box-group__month">{new Date(`${month}-01`).toLocaleString("ko-KR", { month: "long" })}</p>
                    <ul className="box-group__items">
                      {items?.map((item) => {
                        const published = JSON.parse(item.published);
                        const stampImg = published && item.preference === "T" ? StampT : published && item.preference === "F" ? StampF : !published ? StampDiary : null;
                        return <li onClick={() => openReadModal(item)} key={item.replyId} className="box-item">
                          <img className={`box-item__img ${published ? "letter" : "diary"}`} src={stampImg} alt="stamp image 스탬프 이미지" />
                          <div className="box-item__desc">
                            <p className="box-item__desc--date">{item?.createdAt ? formattedDates(item.createdAt) : "-"}</p>
                            <p className="box-item__desc--content">{item.content}</p>
                          </div>
                        </li>
                      })}
                    </ul>
                  </div>
              })}
              <div id="observer" style={{ height: "10px" }}></div>
            </div>
          ) : Object.values(filterList)?.length === 0 ? (
            <div className={`memorybox__body ${!Object.values(filterList)?.length ? "minHeight" : ""}`}>
              <div className="not-list">
                  <img className="rabbit" src={ImgNotList} alt="not list 리스트 없음 이미지" />
                  <div className="not-list__desc">
                    <p>앗, 아직 도착한 편지가 없어요.</p>
                    <p>새로운 편지를 작성해볼까요?</p>
                  </div>
              </div>
            </div>
          ) : null}
        </>
      )}
      <YearPicker open={isYearPickerOpen} onClose={() => setIsYearPickerOpen(false)} currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  )
}

export default MemoryBox;
