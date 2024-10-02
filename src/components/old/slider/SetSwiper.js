import { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Grid } from 'swiper/modules';
import GameCard from 'components/item/Card';
import Skeleton from '@mui/material/Skeleton';
import 'swiper/css';
import 'swiper/css/grid';
import { useTranslation } from 'react-i18next'

function SetSlideTitle({ title, iconName, view }) {
  const { t } = useTranslation();
  return (
    <div className="slider-title">
      <div className="title-info">
        <i className={`icon-set ${iconName}`}></i>
        <p>{t(title)}</p>
      </div>
      <button onClick={view} className="view-all">{t('commonDesc.viewAll')}</button>
    </div>
  )
}

function SetSlidetButton() {
  return (
    <div className="slider-btn">
      <button className="btn-prev"></button>
      <button className="btn-next"></button>
    </div>
  );
}


export default function SetSwiper({list, loading}) {
  const { groupInfo, items } = list;
  const viewRef = useRef(null);
  const [viewSize, setViewSize] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(null);

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

  return (
    <Swiper
      className="slider-component"
      modules={[Navigation, Grid]}
      speed={700}
      observer={true}
      observeParents={true}
      ref={viewRef}
      navigation={{
        nextEl: '.slider-btn .btn-next',
        prevEl: '.slider-btn .btn-prev',
      }}
      slidesPerGroup={slidesPerView}
      slidesPerView={slidesPerView}
      grid={{
        rows: 2,
        fill: "row",
      }}
      spaceBetween={viewSize <= 700 ? 16 : 24}
    >
      <div className="slider-component__header">
        <SetSlideTitle {...groupInfo}  />
        <SetSlidetButton />
      </div>
      {loading ?
        Array.from(new Array(slidesPerView)).map((item, index) => {
          return <SwiperSlide key={index}>
            <Skeleton sx={{ bgcolor: '#393939' }} className="thumbnail" animation="wave" variant="rectangular" />
          </SwiperSlide>
        }) :
        items?.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <GameCard gameData={{gameType: item.gameTypeID, title: groupInfo.title, iconName: groupInfo.iconName}} item={item} />
            </SwiperSlide>
          )
        })
      }
    </Swiper>
  );
};


// onSlideChange={() => console.log('slide change')}
// onSwiper={(swiper) => console.log(swiper)}