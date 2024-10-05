import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { openModal } from 'store/modules/components';
import { DATA } from 'constants'

import UserProfile from 'components/item/UserProfile'
import Skeleton from '@mui/material/Skeleton';

import UnLike from 'assets/Icon/btn-unlike.svg';
import LogoImg from 'assets/Logo/logo_s.svg';

import { getLatestLetterListAPI, getLatestCommunityListAPI } from 'api/v1/letters'


const mock_community = [
  {
    id: 1,
    title: "친구 위로, 어떻게 해야 할까요? 😢",
    content: "친구가 힘들어하는데 어떻게 위로해야 할지 모르겠어요.",
    likeCount: 4,
    date: "1시간 전",
  },
  {
    id: 2,
    title: "오늘 너무 힘들었어요, 공감 부탁해요....",
    content: "오늘 너무 바빠서 힘들었어요. 공감과 위로가 필요해요...",
    likeCount: 6,
    date: "1시간 전",
  },
  {
    id: 3,
    title: "면접장에만 가면 너무 떨려요..",
    content: "면접을 볼 때 너무 떨리고, 계속 결과가 좋지 않아서 자신감이 떨어져요..",
    likeCount: 2,
    date: "1시간 전",
  },
  {
    id: 4,
    title: "시험에 합격하고 싶습니다. 어떻게 하면 좋을까요?",
    content: "열심히 준비하고 시험을 치루는데도 계속 떨어지네요. 시험을 치룬 기간이 오래되다 보니 고민이 됩니다.",
    likeCount: 4,
    date: "2시간 전",
  },
  {
    id: 5,
    title: "친구하고 사소한 일로 싸웠어요...",
    content: "친구하고 놀다가 정말 사소한 일로 다투었는데 어떻게 화해할 수 있을까요?",
    likeCount: 6,
    date: "2시간 전",
  },
  {
    id: 6,
    title: "한 가지 일에 몰두해서 할 수가 없어요...ㅠ",
    content: "책을 읽거나 공부할 때 집중할 수 있는 시간이 너무 짧아서 제가 너무 한심한 것 같아요..",
    likeCount: 2,
    date: "4시간 전",
  }
]


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
          latestList.map((item, index) => {
            return <SwiperSlide key={item.replyId}>
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
                      <p className="card-content__desc">{item.content}</p>
                      {/* <ul className="card-content__tags">
                        {item.tag.map((itm, idx) => {
                          return <li key={idx}><p>#{itm}</p></li>
                        })}
                      </ul> */}
                    </div>
                  </div>      
                  <button onClick={() => dispatch(openModal({modalType: "Read", data: { item, id: index }}))} className="card-result-btn"><p>DJ의 답변 보기</p></button>
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
          {mock_community.map(item => {
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
    </div>
  )
}

export default Home;
