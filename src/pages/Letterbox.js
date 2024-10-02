import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/pagination';

import Skeleton from '@mui/material/Skeleton';
import GoBackTitleBar from 'components/common/GoBackTitleBar';

import ImgLetterF from 'assets/Content/f-letter-item.svg'
import ImgLetterT from 'assets/Content/t-letter-item.svg'

const mock_letter = [
  {
    type: "t",
    date: "2024.10.01"
  },
  {
    type: "t",
    date: "2024.09.24"
  },
  {
    type: "f",
    date: "2024.09.10"
  },
  {
    type: "f",
    date: "2024.09.10"
  },
  {
    type: "f",
    date: "2024.09.04"
  },
  {
    type: "t",
    date: "2024.09.02"
  },
  {
    type: "f",
    date: "2024.09.01"
  },
  {
    type: "t",
    date: "2024.10.01"
  },
  {
    type: "t",
    date: "2024.09.24"
  },
  {
    type: "f",
    date: "2024.09.10"
  },
  {
    type: "f",
    date: "2024.09.10"
  },
  {
    type: "f",
    date: "2024.09.04"
  },
  {
    type: "t",
    date: "2024.09.02"
  },
  {
    type: "f",
    date: "2024.09.01"
  },
]

function LetterIistSlide({slidesPerPage}) {
  const [loading, setLoading] = useState(true);
  const slidesPerView = 2
  const rows = slidesPerPage / slidesPerView
  const [currentIndex, setCurrentIndex] = useState(0);
  
  return (
    <div className="letter-box">
      <Swiper
        modules={[Pagination, Grid]}
        grabCursor={true}
        slidesPerView={slidesPerView}
        slidesPerGroup={slidesPerView} 
        grid={{
          rows: rows,
          fill: "row",
        }}
        speed={300}
        pagination={{
          el: '.swiper-pagination-custom',
          clickable: true, // 페이지네이션 버튼 클릭 가능하게 할지 말지
        }}
        spaceBetween={28}
        onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
      >
      {(() => {
          const slides = mock_letter.map((item, index) => {
            return (
            <SwiperSlide key={index}>
              <div className="letter-item">
                <img className="img" src={item.type === "f" ? ImgLetterF : item.type === "t" ? ImgLetterT : null} alt={`type ${item.type} letter img 편지 이미지`} />
                <p className="date">{item.date ? item.date : "-"}</p>
              </div>
            </SwiperSlide>
          )});
    
          // 마지막 페이지에 필요한 빈 슬라이드를 계산해서 추가
          const totalItems = mock_letter.length;
          const lastPageItems = totalItems % slidesPerPage;
          const emptySlidesNeeded = lastPageItems > 0 ? slidesPerPage - lastPageItems : 0;
    
          // 빈 슬라이드를 동적으로 추가
          for (let i = 0; i < emptySlidesNeeded; i++) {
            slides.push(
              <SwiperSlide key={`empty-${i}`}>
              </SwiperSlide>
            );
          }  
          return slides;
        })()
      }
      </Swiper>
      <div className="swiper-pagination-custom"></div>
    </div>
  )
}

const calculateLimit = (height) => {
  const itemHeight = 190; // 각 아이템의 높이
  const visibleRows = Math.floor(height / itemHeight); // 화면에 보이는 세로 개수
  return visibleRows * 2; // 가로 2개 아이템
};

function Letterbox() {  
  const screen = useSelector(state => { return state?.ui?.screen; });
  const [slidesPerPage, setSlidesPerPage] = useState(null);

  const { height } = screen?.size;
  const paddingValue = 116;
  const newHeight = height - paddingValue;
  
  useEffect(() => {
    const updateLimit = () => {
      const calculatedLimit = calculateLimit(newHeight);
      setSlidesPerPage(calculatedLimit);
    };
    updateLimit();
  }, [screen]);

  return (
    <div className="letterbox">
      <GoBackTitleBar title="편지함" />
      <div className="letterbox__inner">
        <LetterIistSlide slidesPerPage={slidesPerPage} />
      </div>
    </div>
  )
}

export default Letterbox;
