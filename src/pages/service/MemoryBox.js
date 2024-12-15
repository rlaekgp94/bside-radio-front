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


const tabItems = [
  {
    title: "전체",
    id: "all",
  },
  {
    title: "편지",
    id: "letter",
  },
  {
    title: "일기",
    id: "diary",
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
  const selections = { years: Array.from({ length: 5 }, (_, i) => 2020 + i) }
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


/**
 * TODOLIST
 * 1. 탭 이동시 스크롤 초기화
 * 2. 무한스크롤링
 * 3. 편지/일기 모달 타이틀 변경 -> 날짜포맷/"내 사연" 빼기
 * 4. 스켈레톤 로딩
 * 5. letterBox 관련 데이터 삭제
 */
const mock = 
{
  "content": [
    {
      "replyId": "4eabe132-f3eb-469d-a72a-710b76fd7ca6",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 30일 21시 작성24088@KAKAO이 작성한 편지 - 24년 10월 30일 21시 작성",
      "preference": "T",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 89",
        "message_t": "T 유형 메시지 예시 89\r"
      },
      "createdAt": "2024-11-01T21:00:00"
    },
    {
      "replyId": "f577c5a8-dc34-4d91-b5da-8f915ef453d0",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 30일 18시 작성",
      "preference": "T",
      "published": "false",
      "reply": {
        "message_f": "F 유형 메시지 예시 33",
        "message_t": "T 유형 메시지 예시 33\r"
      },
      "createdAt": "2024-11-01T18:00:00"
    },
    {
      "replyId": "0a8a8359-78ea-44c5-ab29-bb821f6d9198",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 30일 15시 작성",
      "preference": "T",
      "published": "false",
      "reply": {
        "message_f": "F 유형 메시지 예시 90",
        "message_t": "T 유형 메시지 예시 90\r"
      },
      "createdAt": "2024-10-30T15:00:00"
    },
    {
      "replyId": "ccdfc279-5397-4ba4-a31e-486d2b4d7d6d",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 30일 12시 작성",
      "preference": "T",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 70",
        "message_t": "T 유형 메시지 예시 70\r"
      },
      "createdAt": "2024-10-30T12:00:00"
    },
    {
      "replyId": "5d238a7f-8ea4-4e04-b897-a1f9cd173b49",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 30일 09시 작성",
      "preference": "T",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 65",
        "message_t": "T 유형 메시지 예시 65\r"
      },
      "createdAt": "2024-10-30T09:00:00"
    },
    {
      "replyId": "95b1c5fe-2d4f-4285-a711-74e56381da7c",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 21시 작성",
      "preference": "T",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 77",
        "message_t": "T 유형 메시지 예시 77\r"
      },
      "createdAt": "2024-10-29T21:00:00"
    },
    {
      "replyId": "d7299b5c-7d74-4f26-addf-7df11511f296",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 18시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 60",
        "message_t": "T 유형 메시지 예시 60\r"
      },
      "createdAt": "2024-10-29T18:00:00"
    },
    {
      "replyId": "da4f3269-f3a9-4956-b773-d69062bdd235",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 15시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 99",
        "message_t": "T 유형 메시지 예시 99\r"
      },
      "createdAt": "2024-10-29T15:00:00"
    },
    {
      "replyId": "0c90c532-f455-4854-94df-8081b3a2dd09",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 12시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 46",
        "message_t": "T 유형 메시지 예시 46\r"
      },
      "createdAt": "2024-10-29T12:00:00"
    },
    {
      "replyId": "53e4a2c9-0dc0-4e0c-8349-588c36d0d985686",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 09시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 100",
        "message_t": "T 유형 메시지 예시 100\r"
      },
      "createdAt": "2024-10-29T09:00:00"
    },
    {
      "replyId": "53e4a2c9-0dc0-4e0c-8349-588c6d03d91886",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 09시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 100",
        "message_t": "T 유형 메시지 예시 100\r"
      },
      "createdAt": "2024-10-29T09:00:00"
    },
    {
      "replyId": "53e4a2c9-0dc0-4e0c-8349-588c6d02d9886",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 09시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 100",
        "message_t": "T 유형 메시지 예시 100\r"
      },
      "createdAt": "2024-09-29T09:00:00"
    },
    {
      "replyId": "53e4a2c9-0dc0-4e0c-8349-588c6d0d9886",
      "userId": "6374fec7-65d3-40b0-a9a0-4dbec96eef75",
      "content": "24088@KAKAO이 작성한 편지 - 24년 10월 29일 09시 작성",
      "preference": "F",
      "published": "true",
      "reply": {
        "message_f": "F 유형 메시지 예시 100",
        "message_t": "T 유형 메시지 예시 100\r"
      },
      "createdAt": "2023-12-29T09:00:00"
    }
  ],
  "pageable": {
    "pageNumber": 0,
    "pageSize": 10,
    "sort": [],
    "offset": 0,
    "paged": true,
    "unpaged": false
  },
  "totalElements": 150,
  "totalPages": 15,
  "last": false,
  "size": 10,
  "number": 0,
  "sort": [],
  "numberOfElements": 10,
  "first": true,
  "empty": false
}

function MemoryBox() {  
  const [currentDate, setCurrentDate] = useState(dayjs()?.year());
  const [tab, setTab] = useState(tabItems[0])
  const [list, setList] = useState([]);
  const [isYearPickerOpen, setIsYearPickerOpen] = useState(false);
  const dispatch = useDispatch();

  const openReadModal = (item) => {
    if (!item) return;
    dispatch(openModal({modalType: "Read", data: { item }}))
  }

  const filterAndGroupByMonth = () => {    
    const newList = mock?.content
      .filter((item) => {
        const year = new Date(item.createdAt).getFullYear();
        const published = JSON.parse(item.published);

        return (
          year === currentDate &&
          (tab.id === "all" || (tab.id === "letter" && published) || (tab.id === "diary" && !published))
        );
      })
      .reduce((acc, item) => {
        const month = new Date(item.createdAt).toISOString().slice(0, 7);
        (acc[month] ||= []).push(item);
        return acc;
      }, {});
    setList(newList)
  }

  useEffect(() => {
    filterAndGroupByMonth()
    // getLetterList()
    console.log("currentDate", currentDate)
  }, [currentDate, tab])

  const getLetterList = async () => {
    if (!userInfo?.userId) return;
    const userId = "6374fec7-65d3-40b0-a9a0-4dbec96eef75"
    setLoading(true)
    try {
      const res = await getUserMemoryListAPI(userId, currentDate.toString(), 0);
      console.log("res", res)
      setList(res?.content)
      setCount(res?.totalPages)
    } catch(e) {
      console.log("e: ", e);
    } finally {
      setLoading(false);
    }
  }

  const pushLetterList = async (page) => {
    setLoading(true);
    try {
      const res = await getUserMemoryListAPI(userId, page)
      setList(prevState => [...prevState, ...res?.content]);
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setLoading(false);
    }
  }
  
  // useEffect(() => {
  //   if (page > 0) {
  //     pushLetterList(page)
  //   }
  // }, [page]);

  // useEffect(() => {
  //   getLetterList()
  // }, [])

  // const handleObserver = (entries) => {
  //   const target = entries[0];
  //   if (target.isIntersecting && !loading) {
  //     setPage((prevPage) => {
  //       if (prevPage === count) return prevPage;
  //       return prevPage + 1;
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (!list?.length) return;
  //   const observer = new IntersectionObserver(handleObserver, {
  //     threshold: 0,
  //   });
  //   const observerTarget = document.getElementById("observer");
  //   if (observerTarget) {
  //     observer.observe(observerTarget);
  //   }
  // }, [count]);
  
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
      <div className={`memorybox__body ${!Object.values(list)?.length ? "minHeight" : ""}`}>
        {Object.values(list)?.length ? Object.entries(list)
          .sort((a, b) => (a[0] < b[0] ? 1 : -1))
          .map(([month, items], index) => (            
            <div key={month} className={`box-group ${index > 0 ? "line" : ""}`}>
              <p className="box-group__month">{new Date(`${month}-01`).toLocaleString("ko-KR", { month: "long" })}</p>
              <ul className="box-group__items">
                {items.map((item) => {
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
        )) : <div className="not-list">
            <img className="rabbit" src={ImgNotList} alt="not list 리스트 없음 이미지" />
            <div className="not-list__desc">
              <p>앗, 아직 도착한 편지가 없어요.</p>
              <p>새로운 편지를 작성해볼까요?</p>
            </div>
        </div>}
      </div>
      <YearPicker open={isYearPickerOpen} onClose={() => setIsYearPickerOpen(false)} currentDate={currentDate} setCurrentDate={setCurrentDate} />
    </div>
  )
}

export default MemoryBox;
