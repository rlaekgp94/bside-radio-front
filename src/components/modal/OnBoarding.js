import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css/navigation';
import 'swiper/css';

import ImgOnBoardingInfo01 from 'assets/Content/reports/onboarding/info-1.png'
import ImgOnBoardingInfo02 from 'assets/Content/reports/onboarding/info-2.png'
import ImgOnBoardingInfo03 from 'assets/Content/reports/onboarding/info-3.png'

export default function OnBoarding() {
  const dispatch = useDispatch();
  const { modalType, isOpen } = useSelector(selectModal);

  const prevButtonRef = useRef(null);
  const nextButtonRef = useRef(null);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const [isLastSlide, setIsLastSlide] = useState(false);

  const handleClose = () => { dispatch(closeModal()); };

  return (
    <Dialog
      open={modalType === "OnBoarding" && isOpen}
      onClose={handleClose}
      className="long-dialog-wrapper OnBoarding"
    >      
      <div className="long-dialog-inner">
        <button className="close-btn" onClick={handleClose}>완료</button>
        <button
          ref={prevButtonRef}
          className={`custom-prev-button ${isFirstSlide ? "disabled" : ""}`}
          disabled={isFirstSlide}
        ></button>        
        <button
          ref={nextButtonRef}
          className={`custom-next-button ${isLastSlide ? "disabled" : ""}`}
          disabled={isLastSlide}
        ></button>
        <Swiper      
          spaceBetween={0} 
          modules={[Navigation]}
          navigation={{
            prevEl: prevButtonRef.current,
            nextEl: nextButtonRef.current,
          }}
          onSwiper={(swiper) => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsFirstSlide(swiper.isBeginning);
            setIsLastSlide(swiper.isEnd);
          }}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevButtonRef.current;
            swiper.params.navigation.nextEl = nextButtonRef.current;
          }}
          className="onboarding-swiper">
          <SwiperSlide><img src={ImgOnBoardingInfo01} alt="온보딩 이미지01" /></SwiperSlide>
          <SwiperSlide><img src={ImgOnBoardingInfo02} alt="온보딩 이미지02" /></SwiperSlide>
          <SwiperSlide><img src={ImgOnBoardingInfo03} alt="온보딩 이미지03" /></SwiperSlide>
        </Swiper>
      </div>
    </Dialog>
  )
}