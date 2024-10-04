import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';

import { openModal } from 'store/modules/components';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

import { DATA } from 'constants'
import UnLike from 'assets/Icon/btn-unlike.svg';
import LogoImg from 'assets/Logo/logo_s.svg';
import UserProfile from 'components/item/UserProfile'

import { getLatestLetterListAPI, getLatestCommunityListAPI } from 'api/v1/letters'


const mock_letter = [
  {
    email: "test@gmail.com",
    id: 1,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.10.01"
  },
  {
    email: "test@gmail.com",
    id: 2,
    content: "친구와 큰 다툼을 했는데, 서로의 감정이 격해져서 더 이상 대화가 불가능한 상황입니다. 어떻게 하면 다시 친구와 화해할 수 있을까요?",
    tag: ["우정", "화해"],
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "T",
    date: "2024.09.24"
  },
  {
    email: "test@gmail.com",
    id: 3,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.10.01"
  },
  {
    email: "test@gmail.com",
    id: 4,
    content: "친구와 큰 다툼을 했는데, 서로의 감정이 격해져서 더 이상 대화가 불가능한 상황입니다. 어떻게 하면 다시 친구와 화해할 수 있을까요?",
    tag: ["우정", "화해"],
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "T",
    date: "2024.09.24"
  },
]

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
    title: "오늘 너무 힘들었어요, 공감 부탁해요....",
    content: "오늘 너무 바빠서 힘들었어요. 공감과 위로가 필요해요...",
    likeCount: 2,
    date: "1시간 전",
  },
  {
    id: 4,
    title: "친구 위로, 어떻게 해야 할까요? 😢",
    content: "친구가 힘들어하는데 어떻게 위로해야 할지 모르겠어요.",
    likeCount: 4,
    date: "1시간 전",
  },
  {
    id: 5,
    title: "오늘 너무 힘들었어요, 공감 부탁해요....",
    content: "오늘 너무 바빠서 힘들었어요. 공감과 위로가 필요해요...",
    likeCount: 6,
    date: "1시간 전",
  },
  {
    id: 6,
    title: "오늘 너무 힘들었어요, 공감 부탁해요....",
    content: "오늘 너무 바빠서 힘들었어요. 공감과 위로가 필요해요...",
    likeCount: 2,
    date: "1시간 전",
  }
]

function MainSlide() {
  const dispatch = useDispatch();
  const [list, setList] = useState([]);

  const getLatestLetterList = async () => {
    try {
      const res = await getLatestLetterListAPI(10);
      setList(res)
      console.log("LatestList res: ", res)
    } catch(e) {
      console.log("e", e)
    }
  }

  useEffect(() => {
    getLatestLetterList()
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
        {mock_letter.map(item => (
          <SwiperSlide key={item.id}>
            <div className="slide-card">
              <div className="slide-card__inner">                
                <div className="card-title">
                  <img className="card-title__profile" src={DATA.defaultProfile} alt="profile img" />
                  <div className="card-title__desc">
                    <p className="id">#{item.id}. </p>
                    <p className="info">누군가의 사연 🌕</p>
                  </div>
                </div>
                <div className="card-content">
                  <p className="card-content__desc">{item.content}</p>
                  <ul className="card-content__tags">
                    {item.tag.map((itm, idx) => {
                      return <li key={idx}><p>#{itm}</p></li>
                    })}
                  </ul>
                </div>
                <button onClick={() => dispatch(openModal({modalType: "Read", data: { item }}))} className="card-result-btn"><p>DJ의 답변 보기</p></button>
              </div>
            </div>
          </SwiperSlide>    
        ))}  
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
  )
}

function Home() {
  const storeUser = useSelector(state => { return state?.user; });
  const { userInfo, isLoggedIn } = storeUser;
  const [communityList, setCommunityList] = useState([])

  const getLatestCommunityList = async () => {
    try {
      const res = await getLatestCommunityListAPI();
      setCommunityList(res)
      console.log("CommunityList res: ", res)
    } catch(e) {
      console.log("e", e)
    }
  }

  useEffect(() => {
    getLatestCommunityList()
  }, [])
  
  return (
    <div className="home">
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
