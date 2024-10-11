import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { openModal } from 'store/modules/components';
import { DATA } from 'constants'
import { MOCK } from 'constants/mock'

import UserProfile from 'components/item/UserProfile'
import Skeleton from '@mui/material/Skeleton';

import UnLike from 'assets/Icon/btn-unlike.svg';
import LogoImg from 'assets/Logo/logo_s.svg';

import { getLatestLetterListAPI, getLatestCommunityListAPI } from 'api/v1/letters'



function MainSlide() {
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
        spaceBetween={12}   // 슬라이드 간격 
        slidesPerView="auto"
        // slidesPerView={1.35}   // 한번에 보이는 슬라이드 갯수
      >          
        {loading ?
          Array.from(new Array(3)).map((item, index) => {
            return <SwiperSlide key={index}>
              <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" width={276} height={280} variant="rectangular" />
            </SwiperSlide>
          }) :
          latestList.length && latestList.map((item, index) => {
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
          })
        }
      </Swiper>
    </div>
  )
}

function UserInfoBar() {
  return (
    <div className="userInfo-bar layout-p">
      <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
      <UserProfile />
    </div>
    // <div className="userInfo-bar">
    //   <div className="userInfo-bar__inner layout-p">
    //     <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
    //     <UserProfile />
    //   </div>
    // </div>
  )
}

function Home() {
  
  return (
    <div className="home">
      {/* <UserInfoBar /> */}
      <section className="layout-bg">
        <UserInfoBar />
        <MainSlide />
      </section>
      <section className="community-layout layout-p">
        <p className="community-layout__title">커뮤니티</p>
        <ul className="community-list">
          {MOCK.community.map(item => {
            return <li key={item.id} className="list-item">
              <p className="list-item__title">{item.title}</p>
              <p className="list-item__content">{item.content}</p>
              <div className="list-item__footer">
                <p className="list-item__footer--date">{item.date}</p>
                <div className="list-item__footer--like">
                  <img className="like-btn" src={UnLike}></img>
                  <p>{item.likeCount}</p>
                </div>
              </div>
            </li>
          })}
        </ul>
      </section>
      {/* <div className="footer">
        <a className="link" target="_black" href={DATA.PRIVACY_POLICY_URL}>개인정보처리방침</a>
      </div> */}
    </div>
  )
}

export default Home;
