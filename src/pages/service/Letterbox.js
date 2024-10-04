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

const mock_letter = [
  {
    id: 1,
    email: "danyekgp@gmail.com",
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
    email: "danyekgp@gmail.com",
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
    email: "danyekgp@gmail.com",
    id: 3,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "T",
    date: "2024.09.10"
  },
  {
    email: "danyekgp@gmail.com",
    id: 4,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.09.10"
  },
  {
    email: "danyekgp@gmail.com",
    id: 5,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.09.04"
  },
  {
    email: "danyekgp@gmail.com",
    id: 1,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "T",
    date: "2024.09.02"
  },
  {
    email: "danyekgp@gmail.com",
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
    email: "danyekgp@gmail.com",
    id: 2,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "T",
    date: "2024.09.24"
  },
  {
    email: "danyekgp@gmail.com",
    id: 3,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.09.10"
  },
  {
    email: "danyekgp@gmail.com",
    id: 4,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.09.10"
  },
  {
    email: "danyekgp@gmail.com",
    id: 5,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "F",
    date: "2024.09.04"
  },
  {
    email: "danyekgp@gmail.com",
    id: 1,
    content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
    tag: ["창업", "비즈니스", "결정"],  
    replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    reply: {
      message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
      message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
    },
    preference: "T",
    date: "2024.09.02"
  },
]




function LoadingSkeleton() {
  return (
    <div className="loading-skeleton">
      <Skeleton animation="wave" variant="circular" width={128} height={128} />
      <div className="loading-skeleton__text">
        <Skeleton animation="wave" height={20} width="60%" style={{ marginBottom: 6 }} />
        <Skeleton animation="wave" height={20} width="40%" />
      </div>
    </div>
  )
}
function LetterIistItem({item}) {
  const dispatch = useDispatch();

  const data = { item };
  
  
  return (
    <>
      {/* {item.letterId ?  */}
        <li onClick={() => dispatch(openModal({modalType: "Read", data}))} className="letter-item">
          <div className="letter-item__inner">
            <img className="letter-img" src={item.preference === "T" ? ImgLetterT : ImgLetterF} alt={`type ${item.preference} letter img 편지 이미지`} />
            <div className="letter-info">
              <img className="stamp-img" src={item.preference === "T" ? ImgLetterStampT : ImgLetterStampF} alt={`type ${item.preference} letter stamp img 편지 스탬프 이미지`} />
              <div className="letter-info__content">
                <p className="date">{item.date ? item.date : "-"}</p>
                <p className="desc">당신에게 도착한 편지를 읽어보세요.</p>
              </div>
            </div>
          </div>
        </li>
        {/* : <LoadingSkeleton />}     */}
    </>
  )
}

function LetterIist() {
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const size = 10;

  const getUserLetterList = async () => {
    if (!userInfo?.userId) return;
    console.log(1)
    setLoading(true)
    try {
      const res = await getUserLetterListAPI(userInfo.userId, 1, 10);
      console.log("res", res?.content)
      setList(res?.content)
      setLoading(false)
    } catch(e) {
      console.log("e", e)
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserLetterList()
  }, [])
  
  return (
    <ul className="letter-list">
      {loading ? 
        Array.from(new Array(5)).map((item, index) => {
          return (
            <LoadingSkeleton key={index} />
          )
        }) : list?.length ? list.map((item, index) => {
        return (
          <LetterIistItem item={item} key={index} />
        )
      }) : !list?.length ? <div>리스트 없음</div> : null}
    </ul>
  )
}

function Letterbox() {  

  return (
    <div className="letterbox">
      <GoBackTitleBar title="편지함" />
      <div className="letterbox__inner layout-p">
        <LetterIist />
      </div>
    </div>
  )
}

export default Letterbox;
