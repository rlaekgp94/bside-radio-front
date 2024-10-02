import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from 'react';
// import Login from './Login';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import UnLike from 'assets/Icon/btn-unlike.svg';


const mock_letter = [
  {
    id: 1,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"]
  },
  {
    id: 2,
    content: "친구와 큰 다툼을 했는데, 서로의 감정이 격해져서 더 이상 대화가 불가능한 상황입니다. 어떻게 하면 다시 친구와 화해할 수 있을까요?",
    tag: ["우정", "화해"]
  },
  {
    id: 3,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"]
  },
  {
    id: 4,
    content: "친구와 큰 다툼을 했는데, 서로의 감정이 격해져서 더 이상 대화가 불가능한 상황입니다. 어떻게 하면 다시 친구와 화해할 수 있을까요?",
    tag: ["우정", "화해"]
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
                  <div className="card-title__img"></div>
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
                <button className="card-result-btn"><p>DJ의 답변 보기</p></button>
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
      <div className="desc"></div>
      <div className="profile"></div>
    </div>
  )
}

function Home() {
  const storeUser = useSelector(state => { return state?.user; });
  const { userInfo, isLoggedIn } = storeUser;
  
  return (
    <div className="home">
      <section className="bg-layout">
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
