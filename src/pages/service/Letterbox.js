import { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { openModal } from 'store/modules/components';

import Skeleton from '@mui/material/Skeleton';
import GoBackTitleBar from 'components/common/GoBackTitleBar';

import { getUserLetterListAPI } from 'api/v1/letters'

import ImgLetterF from 'assets/Content/f-letter-item.png'
import ImgLetterT from 'assets/Content/t-letter-item.png'
import ImgLetterStampF from 'assets/Content/f-letter-stamp.svg'
import ImgLetterStampT from 'assets/Content/t-letter-stamp.svg'

import ImgListNotItem from 'assets/Content/list-not-item.png'


const formattedDates = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
}


function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" variant="circular" width={128} height={128} />
      <div className="loading-skeleton__text">
        <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />
        <Skeleton sx={{ bgcolor: '#ececf0' }} animation="wave" height={20} width="40%" />
      </div>
    </div>
  )
}

function LetterIistItem({item}) {
  const dispatch = useDispatch();

  const openReadModal = (item) => {
    if (!item) return;
    dispatch(openModal({modalType: "Read", data: { item }}))
  }

  
  return (
    <>
      <div onClick={() => openReadModal(item)} className="letter-item">
        <div className="letter-item__inner">
          <img className="letter-img" src={item?.preference === "T" ? ImgLetterT : ImgLetterF} alt={`type ${item?.preference} letter img 편지 이미지`} />
          <div className="letter-info">
            <img className="stamp-img" src={item?.preference === "T" ? ImgLetterStampT : ImgLetterStampF} alt={`type ${item?.preference} letter stamp img 편지 스탬프 이미지`} />
            <div className="letter-info__content">
              <p className="date">{item?.createdAt ? formattedDates(item.createdAt) : "-"}</p>
              <p className="desc">당신에게 도착한 편지를 읽어보세요.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function Letterbox() {  
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [list, setList] = useState(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [count, setCount] = useState(null);

  const getLetterList = async () => {
    if (!userInfo?.userId) return;
    setLoading(true)
    try {
      const res = await getUserLetterListAPI(userInfo.userId, page);
      setList(res?.content)
      setCount(res?.totalPages)
    } catch(e) {
      console.log("e: ", e);
    } finally {
      setLoading(false);
    }
  }

  const pushLetterList = async (page) => {
    setLoading(true);
    try {
      const res = await getUserLetterListAPI(userInfo.userId, page)
      setList(prevState => [...prevState, ...res?.content]);
    } catch (e) {
      console.log("e: ", e);
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    if (page > 0) {
      pushLetterList(page)
    }
  }, [page]);

  useEffect(() => {
    getLetterList()
  }, [])

  const handleObserver = (entries) => {
    const target = entries[0];
    if (target.isIntersecting && !loading) {
      setPage((prevPage) => {
        if (prevPage === count) return prevPage;
        return prevPage + 1;
      });
    }
  };

  useEffect(() => {
    if (!list?.length) return;
    const observer = new IntersectionObserver(handleObserver, {
      threshold: 0,
    });
    const observerTarget = document.getElementById("observer");
    if (observerTarget) {
      observer.observe(observerTarget);
    }
  }, [count]);

  return (
    <div className={`letterbox ${!list?.length ? "isHeight" : ""}`}>
      <GoBackTitleBar title="편지함" />
      {list === null && loading ? (
        <div className="letterbox__inner layout-p">
          <div className="letter-list">
            {Array.from(new Array(5)).map((_, index) => (
              <LoadingSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {list?.length ? (
            <div className="letterbox__inner layout-p">
              <div className="letter-list">
                {list.map((item, index) => (
                  <LetterIistItem item={item} key={index} />
                ))}
              </div>
              <div id="observer" style={{ height: "10px" }}></div>
            </div>
          ) : list?.length === 0 ? (
            <div className="letterbox__not">
              <img className="rabbit" src={ImgListNotItem} alt="리스트 없음 이미지" />
              <p>아직 편지가 도착하지 않았어요...<br />
              첫 번째 사연을 보내볼까요?</p>
            </div>
          ) : null}
        </>
      )}
    </div>
  )
}

export default Letterbox;
