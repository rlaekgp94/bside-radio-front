import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Mousewheel } from 'swiper/modules';
import GameCard from 'components/item/Card';
import Skeleton from '@mui/material/Skeleton';
import 'swiper/css';
import 'swiper/css/grid';
import { useTranslation } from 'react-i18next'
import { getGameListAPI } from 'api/pragmatic'

function SetSlideTitle({ title, iconName }) {
  const { t } = useTranslation();
  return (
    <div className="slider-title">
      <div className="title-info">
        <i className={`icon-set ${iconName}`}></i>
        <p>{t(title)}</p>
      </div>
    </div>
  )
}

export default function InfinitySwiper(props) {
  const gameData = props;
  const viewRef = useRef(null);
  const swiperRef = useRef(null);
  const [viewSize, setViewSize] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(null);
  const [page, setPage] = useState(0);
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false);
  const [totalCount, setTotalCount] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const limit = 30;

  useEffect(() => {
    const handleResize = (entries) => {
      const newWidth = entries[0].contentRect.width;
      setViewSize(newWidth);
    };

    const resizeObserver = new ResizeObserver(handleResize);

    if (viewRef.current) {
      resizeObserver.observe(viewRef.current);
      setViewSize(viewRef.current.offsetWidth);
    }

    return () => resizeObserver.disconnect();
  }, [viewRef]);

  useEffect(() => {
    function setViewSize() {
      if (viewSize <= 500) {
        return 2;
      } else if (viewSize <= 700) {
        return 3;
      } else if (viewSize <= 800) {
        return 4;
      } else if (viewSize <= 1000) {
        return 5;
      } else {
        return 6;
      }
    }
    const viewNumber = setViewSize()
    setSlidesPerView(viewNumber);
  }, [viewSize]);

  const loadMoreSlides = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    if (nextPage <= totalCount) {
      await pushGameList(nextPage);
    }
  };

  const pushGameList = async (nextPage) => {
    setLoading(true);
    try {
      const res = await getGameListAPI(gameData.gameType, "", nextPage, limit)
      if (Array.isArray(res?.games)) {
        setList(prevState => [...prevState, ...res?.games]);
      }
      if (!totalCount) {
        const count = Math.ceil((res?.games[0].totalCount-0) / limit);
        setTotalCount(count);
      }
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    pushGameList()
  }, []);

  useEffect(() => {
    if (list.length > 0 && currentIndex !== 0 && swiperRef.current) {
      swiperRef.current.slideTo(currentIndex, 0);
    }
  }, [list]);

  const handleSlideChange = (swiper) => {
    if (swiper.realIndex !== 0) {
      setCurrentIndex(swiper.realIndex);
    }
  };


  return (
    <Swiper
      onSwiper={(swiper) => {
        swiperRef.current = swiper;
      }}
      className="slider-component"
      modules={[Navigation, Mousewheel]}
      speed={700}
      ref={viewRef}
      navigation={{
        nextEl: '.slider-btn .btn-next',
        prevEl: '.slider-btn .btn-prev',
      }}
      slidesPerGroup={slidesPerView}
      slidesPerView={slidesPerView}
      onSlideChange={handleSlideChange}
      direction={'horizontal'}
      mousewheel={true}
      spaceBetween={viewSize <= 700 ? 16 : 24}
      onReachEnd={loadMoreSlides}
    >
      <div className="slider-component__header">
        <SetSlideTitle {...gameData}  />
        <div className="slider-btn">
          <button className="btn-prev"></button>
          <button className="btn-next"></button>
        </div>
      </div>
      {loading ?
        Array.from(new Array(slidesPerView)).map((item, index) => {
          return <SwiperSlide key={index}>
            <Skeleton sx={{ bgcolor: '#393939' }} className="thumbnail" animation="wave" variant="rectangular" />
          </SwiperSlide>
        }) :
        list?.map((item, index) => (
          <SwiperSlide key={item.gameID}>
            <GameCard gameData={gameData} item={item} />
          </SwiperSlide>
        ))
      }
    </Swiper>
  );
};