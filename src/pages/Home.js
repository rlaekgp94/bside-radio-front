import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import { openModal } from 'store/modules/components';
import { DATA } from 'constants'

import UserProfile from 'components/item/UserProfile'
import Skeleton from '@mui/material/Skeleton';

import LogoImg from 'assets/Logo/logo_s.svg';
import IconTime from 'assets/Icon/icon-time.svg';

import ProgramCoverDalto from 'assets/Content/program/cover-dalto.png'
import ProgramCoverDoto from 'assets/Content/program/cover-doto.png'
import ProgramCoverByulto from 'assets/Content/program/cover-byulto.png'

import { getLatestLetterListAPI } from 'api/v1/letters'



function NoticeList() {
  const notice = [
    {
      id: 1,
      tag: "공지",
      title: "올려올려 라디오 서비스 소개",
      link: "https://www.notion.so/tetroco/12679bf3bae180549fc4ed30f6924870?pvs=4"
    },
  ]
  return (    
    <div className="notice-card layout-p">
      <Swiper
        pagination={true} 
        modules={[Pagination]}
        grabCursor={true}
      >          
        {notice.map(item => {
          return <SwiperSlide key={item.id}>
              <div className="notice-card">
                <div className="notice-card__tag"><p>{item.tag}</p></div>
                <p onClick={() => {if (item.link) window.open(item.link)} } className={`notice-card__title ${item.link ? "cursor" : ""}`}>{item.title}</p>
              </div>
            </SwiperSlide> 
          })
        }
      </Swiper>
    </div>
  )
}


function LatestLetterList() {
  const dispatch = useDispatch();
  const [latestList, setLatestList] = useState([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {   
    setLoading(true)
    try {
      const res = await getLatestLetterListAPI(10);
      setLatestList(res);
      setLoading(false)
    } catch(e) {
      console.log("getLatestLetterListAPI e: ", e)
    }
  }

  useEffect(() => {
    getData()
  }, [])

  const openReadModal = (item, index) => {
    if (!item) return;
    dispatch(openModal({modalType: "Read", data: { item, id: index }}))
  }

  return (    
    <div className="latest-card">
      <Swiper
        slidesOffsetBefore={20}
        slidesOffsetAfter={20}      
        loop={true}
        grabCursor={true}
        spaceBetween={12}  // 슬라이드 간격 
        slidesPerView="auto"
      >          
        {loading ?
          Array.from(new Array(3)).map((item, index) => {
            return <SwiperSlide key={index}>
              <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" width={276} height={280} variant="rectangular" />
            </SwiperSlide>
          }) :
          latestList.length ? latestList.map((item, index) => {
            return <SwiperSlide key={item?.replyId}>
              <div className="slide-card">
                <div className="slide-card__inner">  
                  <div className="top-inner">        
                    <div className="card-title">
                      <img className="card-title__profile" src={DATA.defaultProfile} alt="profile img" />
                      <div className="card-title__desc">
                        <p className="id">#{index+1}. </p>
                        <p className="info">누군가의 사연 🌕</p>
                      </div>
                    </div>
                    <div className="card-content">
                      <p className="card-content__desc">{item?.content ? item.content : "-"}</p>
                      {/* <ul className="card-content__tags">
                        {item.tag.map((itm, idx) => {
                          return <li key={idx}><p>#{itm}</p></li>
                        })}
                      </ul> */}
                    </div>
                  </div>      
                  <button onClick={() => openReadModal(item, index)} className="card-result-btn"><p>DJ의 답변 보기</p></button>
                </div>
              </div>
            </SwiperSlide> 
          }) : null
        }
      </Swiper>
    </div>
  )
}

function ProgramList() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const openComingModal = () => {
    dispatch(openModal({modalType: "Coming"}))
  }
  const program = [
    {
      id: "dalto",
      title: "달토의 힐링 라디오",
      time: "04:00~12:00",
      status: "ON",
      coverImage: ProgramCoverDalto
    },
    {
      id: "doto",
      title: "도토의 도토리 파워",
      time: "12:00~18:00",
      status: "COMING",
      coverImage: ProgramCoverDoto
    },
    {
      id: "byulto",
      title: "별토의 보라빛 밤",
      time: "18:00~04:00",
      status: "COMING",
      coverImage: ProgramCoverByulto
    },
  ]

  return (    
    <div className="program-wrapper">
      <div className="program-title layout-p">
        <p>편성 프로그램</p>
      </div>
      <div className="program-card">
        <Swiper
          slidesOffsetBefore={20}
          slidesOffsetAfter={20}    
          grabCursor={true}
          spaceBetween={8} // 슬라이드 간격 
          slidesPerView="auto"
        >          
          {loading ?
          Array.from(new Array(3)).map((item, index) => {
            return <SwiperSlide key={index}>
              <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" width={276} height={280} variant="rectangular" />
            </SwiperSlide>
          }) :
            program.length && program.map(item => {
              return <SwiperSlide key={item.id}>
                <div onClick={openComingModal} className="slide-card">
                  <div className="card-cover">
                    {item.status === "COMING" ? <div className="card-cover__coming">
                      <p>coming soon</p>
                    </div> : null}
                    {item.status === "ON" ? <div className="card-cover__on">
                      <p>ON AIR</p>
                    </div> : null}
                    <img className="card-cover__image" src={item.coverImage} alt="coverImage img" />
                  </div>
                  <div className="card-info">
                    <p className="card-info__title">{item.title}</p>
                    <div className="card-info__time">
                      <img className="time-icon" src={IconTime} alt="icon time img" />
                      <p>{item.time}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide> 
            })
          }
        </Swiper>
      </div>
    </div>
  )
}

function Home() {
  
  return (
    <div className="home">
      <div className="userInfo-bar layout-p">
        <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        <UserProfile />
      </div>
      <NoticeList />
      <LatestLetterList />   
      <ProgramList />
    </div>
  )
}

export default Home;
