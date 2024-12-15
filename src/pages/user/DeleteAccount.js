import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// import useAuth from 'hooks/useAuth';
import { deleteAccountAPI } from 'api/v1/user'
import { clearUserInfo } from 'store/modules/user';

import GoBackTitleBar from 'components/common/GoBackTitleBar';
import CheckBox from 'components/ui/CheckBox';

import LogoBig from 'assets/Logo/logo_big.svg'

import { CircularProgress, Radio } from '@mui/material';


export default function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(state => { return state?.user.userInfo; });  
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState("");
  const [detailReason, setDetailReason] = useState("");
  const [complete, setComplete] = useState(false);

  const handleChange = (event) => {
    setSelectedNumber(Number(event.target.value));
  };

  const reasonList = [
    {
      id: 1,
      title: "자주 사용하지 않아요."
    },
    {
      id: 2,
      title: "개인정보가 걱정돼요."
    },
    {
      id: 3,
      title: "사용하기 불편해요."
    },
    {
      id: 4,
      title: "답변이 마음에 들지 않아요."
    },
    {
      id: 0,
      title: "기타"
    },
  ]

  const checkBoxInfo = {
    label: '회원 탈퇴 유의사항을 확인하였습니다.',
    checked, 
    setChecked
  }

  useEffect(() => {
    if (detailReason) {
      setDetailReason("")
    }
  }, [selectedNumber])

  const deleteAccount = async () => {
    if (!userInfo?.userId) return;
    setLoading(true)
    try {
      await deleteAccountAPI(userInfo.userId, selectedNumber, detailReason);
      dispatch(clearUserInfo())
      setComplete(true)
      setLoading(false)
    } catch(e) {
      console.log("deleteAccountAPI e: ", e)
      setLoading(false)
    }
  }
  
  return (
    <>    
    {complete ?
      <div className="deleteComplete">
        <div className="deleteComplete__inner">
          <div className="body">
            <div className="body__desc">
              <p>탈퇴가 완료되었습니다.</p>
              <span>올려올려 라디오를<br />이용해 주셔서 감사합니다.</span>
            </div>
            <img className="logo" src={LogoBig} alt="logo 로고 이미지" />
          </div>
          <div className="foot">
            <button onClick={() => navigate("/login")}>확인</button>
          </div>
        </div>
      </div> :
      <div className="deleteAccount">
        <GoBackTitleBar title="계정 탈퇴" />
        <div className="deleteAccount__inner"> 
          <div className="body">
            <div className="delete-data-container">
              <div className="info-wrapper">
                <p className="info-wrapper__title">탈퇴 전 확인해 주세요!</p>
                <ul>
                  <li><p>탈퇴 시 올려올려 라디오의 서비스 이용이 불가합니다.</p></li>
                  <li><p>탈퇴 신청 후 14일 동안은 휴면 계정 상태로 보관됩니다. 이 기간 내에 다시 로그인하시면 계정 복구가 가능합니다. </p></li>
                  <li><p>탈퇴 신청으로부터 14일 후 모든 회원 정보가 삭제되며, 데이터 복구가 불가합니다.</p></li>
                </ul>
              </div>
              <div className="delete-data-form">
                <p className="delete-data-form__title"><span>•</span>탈퇴 사유를 선택해 주세요. (단일선택)</p>
                <ul className="delete-data-form__inner">
                  {reasonList.map(item => {
                    return <li key={item.id}>     
                      <div className="row">
                        <Radio
                            checked={selectedNumber === item.id}
                            onChange={handleChange}
                            value={item.id}
                            name="radio-buttons"
                          />
                          <p>{item.title}</p>
                      </div>
                      <div className="test">
                        {(selectedNumber === 3 && item.id === 3) ||                       
                        (selectedNumber === 0 && item.id === 0) ?                       
                          <textarea
                            className="reason-textarea"
                            name="reason-detailReason-textarea"
                            placeholder="무엇이 불편하셨나요?&#10;소중한 피드백을 통해 더 나은 서비스가 될 수 있도록 목소리를 들려주세요. (선택)"
                            value={detailReason}
                            onChange={(e) => setDetailReason(e.target.value)}
                          /> : null}
                      </div>
                    </li>
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="foot">
            <CheckBox {...checkBoxInfo} />
            <button onClick={deleteAccount} disabled={!checked || selectedNumber >= 5}>{loading ? <CircularProgress size={20} color="inherit" /> : "탈퇴하기"}</button>
          </div>
        </div>
      </div>
    }
    </>
  )
}