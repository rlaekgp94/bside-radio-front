import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import { useSelector } from 'react-redux';
import 'swiper/css';
import BannerImg01 from 'assets/Content/banner/main-banner-02.jpg'
import BannerImg02 from 'assets/Content/banner/main-banner-01.jpg'
import BannerImgDailyWins from 'assets/Content/banner/daily-wins.jpg'
import BannerImgSweetBonanza from 'assets/Content/banner/sweet-bonanza.jpg'
import BannerImgRedeemCode from 'assets/Content/banner/redeem-code.jpg'
import BannerImgAceSupporters from 'assets/Content/banner/ace-supporters.jpg'
// import BannerImgFirstDeposit from 'assets/Content/promotion/first-deposit.jpg'
// import BannerImgGrandOpening from 'assets/Content/banner/main-banner-grandOpening.jpg'

const list = [
  {
    thumbnail: BannerImgAceSupporters,
    link: "https://medium.com/@ACECASINO/join-ace-supporters-today-3a99cc43da67",
    id: "Ace Supporters",
  },
  {
    thumbnail: BannerImgRedeemCode,
    link: "https://medium.com/@ACECASINO/ace-casino-%EF%B8%8F-redeem-code-80372aeb27af",
    id: "Redeem Code",
  },
  {
    thumbnail: BannerImgSweetBonanza,
    link: "https://medium.com/@ACECASINO/ace-casino-sweet-bonanza-1000-sweet-bonanza-daily-cash-drops-493fcb538477",
    id: "sweetBonanza",
  },
  {
    thumbnail: BannerImgDailyWins,
    link: "https://medium.com/@ACECASINO/ace-casino-daily-wins-slots-tournament-be8a939c2cf1",
    id: "dailyWins",
  },
  {
    thumbnail: BannerImg01,
    link: "https://medium.com/@ACECASINO/ace-casino-%EF%B8%8F-affiliate-system-70514866b19e",
    id: "AFFILIATE SYSTEM",
  },
  {
    thumbnail: BannerImg02,
    link: "https://medium.com/@ACECASINO/vip-system-of-ace-casino-%EF%B8%8F-65dd04b00777",
    id: "VIP SYSTEM",
  },
  // {
  //   thumbnail: BannerImgFirstDeposit,
  //   link: "https://medium.com/@ACECASINO/ace-casino-%EF%B8%8F-first-deposit-bonus-2024-5cff7baa2621",
  //   id: "firstDeposit",
  // },
  // {
  //   thumbnail: BannerImgGrandOpening,
  //   link: "https://medium.com/@ACECASINO/official-launch-of-ace-casino-%EF%B8%8F-dbd16d3c5ce9",
  //   id: "grandOpening",
  // },
]

export default function MainBanner({bannerSize}) {
  const isMobile = useSelector(state => { return state?.ui?.screen?.viewType.mobile; });
  const openLink = (item) => {
    if (item.link) {
      window.open(item.link)
    }
  }
  return (
    <div id="main-banner-slider-wrapper" className={bannerSize ? "mobile" : ""}>
      <div className="back"></div>
      <button className="btn-prev"></button>
      <div className="main-banner-slider-inner">
        <Swiper
          className="main-banner-slider-component"
          speed={700}
          observer={true}
          observeParents={true}
          navigation={{
            nextEl: '#main-banner-slider-wrapper .btn-next',
            prevEl: '#main-banner-slider-wrapper .btn-prev',
          }}
          slidesPerView={isMobile ? 1 : 2}
          spaceBetween={24}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          modules={[Autoplay, Navigation]}
        >
          {list?.map((item, index) => (
            <SwiperSlide onClick={() => openLink(item)} key={index} className={`${item.link ? "isLink" : ""}`}>
              <img src={item.thumbnail} alt={`${item.id} thumbnail`} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <button className="btn-next"></button>
    </div>
  )
}