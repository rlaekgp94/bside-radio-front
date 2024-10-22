import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

// import useAuth from 'hooks/useAuth';
// import { patchUserInfoAPI } from 'api/v1/user'
// import { setUserInfo } from 'store/modules/user';

import GoBackTitleBar from 'components/common/GoBackTitleBar';
import CheckBox from 'components/ui/CheckBox';

import { CircularProgress, Radio } from '@mui/material';

const AccountDeletionReason = (props) => {
  const { serviceIssue, setServiceIssue, otherReason, setOtherReason } = props;

  return (
    <div>
      <p>탈퇴 사유를 선택해 주세요. (단일선택)</p>

    </div>
  );
};

export default function DeleteAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [loading, setLoading] = useState(false);

  const [deactivationReason, setDeactivationReason] = useState("");
  const [serviceIssue, setServiceIssue] = useState("");

  const handleChange = (event) => {
    setDeactivationReason(event.target.value);
  };

  const reasonList = [
    "자주 사용하지 않아요.",
    "개인정보가 걱정돼요.",
    "사용하기 불편해요.",
    "답변이 마음에 들지 않아요.",
    "기타"
  ]

  const checkBoxInfo = {
    label: '회원 탈퇴 유의사항을 확인하였습니다.',
    checked, 
    setChecked
  }

  useEffect(() => {
    if (serviceIssue) {
      setServiceIssue("")
    }
  }, [deactivationReason])

  const test = () => {
    console.log("deactivationReason", deactivationReason)
    console.log("serviceIssue", serviceIssue)
  }
  
  return (
    <div className="deleteAccount">
      <GoBackTitleBar title="계정 탈퇴" />
      <div className="deleteAccount__inner"> 
        <div className="body">
          <div className="delete-data-container">
            <div className="info-wrapper">
              <p className="info-wrapper__title">탈퇴 전 확인해 주세요!</p>
              <ul>
                <li><p>탈퇴 시 올려올려 라디오의 서비스 이용이 불가합니다.</p></li>
                <li><p>탈퇴 시 내 편지함을 포함한 모든 회원 정보가 삭제되며, 데이터 복구가 불가합니다.</p></li>
              </ul>
            </div>
            <div className="delete-data-form">
              <p className="delete-data-form__title"><span>•</span>탈퇴 사유를 선택해 주세요. (단일선택)</p>
              <ul className="delete-data-form__inner">
                {reasonList.map(item => {
                  return <li key={item}>     
                    <div className="row">
                      <Radio
                          checked={deactivationReason === item}
                          onChange={handleChange}
                          value={item}
                          name="radio-buttons"
                        />
                        <p>{item}</p>
                    </div>
                    <div className="test">
                      {(deactivationReason === "사용하기 불편해요." && item === "사용하기 불편해요.") ||                       
                      (deactivationReason === "기타" && item === "기타") ?                       
                        <textarea
                          className="reason-textarea"
                          name="reason-serviceIssue-textarea"
                          placeholder="무엇이 불편하셨나요?&#10;소중한 피드백을 통해 더 나은 서비스가 될 수 있도록 목소리를 들려주세요. (선택)"
                          value={serviceIssue}
                          onChange={(e) => setServiceIssue(e.target.value)}
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
          <button onClick={test} disabled={!checked}>{loading ? <CircularProgress size={20} color="inherit" /> : "탈퇴하기"}</button>
        </div>
      </div>
    </div>
  )
}