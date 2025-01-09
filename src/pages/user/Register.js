import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import { setUserInfo } from 'store/modules/user';
import useAuth from 'hooks/useAuth';
import { patchUserInfoAPI } from 'api/v1/user'
import { DATA } from 'constants'

import { CircularProgress, Checkbox } from '@mui/material'
import GoBackTitleBar from 'components/common/GoBackTitleBar';
import Switch from 'components/item/Toggle'
;
import LogoImg from 'assets/Logo/logo_s.svg';
import IconLink from 'assets/Icon/icon-external-link.svg';
import ImgLetterStamp from 'assets/Content/purple-letter-stamp.svg'

function SignupTerms(props) {
  const { setNext, agreements, setAgreements } = props;

  const handleAllAgree = (event) => {
      const checked = event.target.checked;
      setAgreements({
        allAgreed: checked,
        agreeToTerms: checked,
        agreeToPrivacyPolicy: checked,
        emailAdsConsented: checked
      });
  };

  const handleIndividualCheck = (event) => {
      const { name, checked } = event.target;
      const updatedAgreements = {
          ...agreements,
          [name]: checked
      };
      updatedAgreements.allAgreed = updatedAgreements.agreeToTerms && updatedAgreements.agreeToPrivacyPolicy && updatedAgreements.emailAdsConsented;
      setAgreements(updatedAgreements);
  };
  
  return (
    <div className="signupTerms">
      <GoBackTitleBar title="약관 동의" />
      <div className="signupTerms__inner"> 
        <div className="body">
          <div className="data-container">
            <div className="info-wrapper">
              <p className="info-wrapper__title">필수 약관에 동의해 주세요.</p>
              <ul>
                <li><p>올려올려 라디오 서비스 제공 및 이용을 위하여<br />
                아래의 약관 동의 및 회원가입이 필요합니다.</p></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="foot">
          <div className="foot__checkbox">            
            <div className="all">
              <Checkbox checked={agreements.allAgreed} onChange={handleAllAgree} />
              <p>약관 전체동의</p>
            </div>
            <ul>
              <li>
                <Checkbox checked={agreements.agreeToTerms} onChange={handleIndividualCheck} name="agreeToTerms" />
                <div className="rows">
                  <p>(필수) 이용 약관 동의</p>
                  <img onClick={() => window.open(DATA.TERMS_OF_SERVICE_URL, '_blank')} className="icon" src={IconLink} alt="링크 아이콘 link icon" />
                </div>
              </li>
              <li>
                <Checkbox checked={agreements.agreeToPrivacyPolicy} onChange={handleIndividualCheck} name="agreeToPrivacyPolicy" />
                <div className="rows">
                  <p>(필수) 개인정보 처리 방침</p>
                  <img onClick={() => window.open(DATA.PRIVACY_POLICY_URL, '_blank')} className="icon" src={IconLink} alt="링크 아이콘 link icon" />
                </div>
              </li>
              <li>
                <Checkbox checked={agreements.emailAdsConsented} onChange={handleIndividualCheck} name="emailAdsConsented" />
                <div className="rows">
                  <p>(선택) E-mail 광고성 정보 수신동의</p>
                </div>
              </li>
            </ul>
          </div>
          <button disabled={!agreements.agreeToTerms || !agreements.agreeToPrivacyPolicy} onClick={() => setNext("PatchField")}>동의하고 시작하기</button>
        </div>
      </div>
    </div>
  )
}

function PatchField(props) {
  const { agreements } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setUserDataLocalStorage } = useAuth();
  const userInfo = useSelector(state => { return state?.user.userInfo; });  
  
  const [nickname, setNickname] = useState("");
  const [type, setType] = useState("F");
  const [profileImageEnabled, setProfileImageDisable] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeHandler = (e) => {
    setNickname(e.target.value);
  }

  const handleBlur = () => {
    const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/;

    const filteredNickname = nickname
    .split("")
    .filter((char) => regex.test(char)) 
    .join("");

    const trimmedNickname = filteredNickname.slice(0, 12);

    setNickname(trimmedNickname);
  };


  const patchUserInfo = async () => {
    if (!userInfo?.userId) return;
    setLoading(true)
    const { emailAdsConsented, agreeToTerms, agreeToPrivacyPolicy } = agreements;
    try {
      const res = await patchUserInfoAPI(userInfo.userId, nickname, type, profileImageEnabled, emailAdsConsented, agreeToTerms, agreeToPrivacyPolicy);
      setUserDataLocalStorage(JSON.stringify(res))
      dispatch(setUserInfo(res));
      navigate("/")
      setLoading(false)
    } catch(e) {
      console.log("patchUserInfo e: ", e)
      setLoading(false)
    }
  }

  return (
    <div className="register">
      <div className="register__inner">
        <div className="head">
          <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        </div>
        <div className="body">
          <div className="letter-content">
            <div className="letter-content-border">
              <p className="title">초대장</p>
              <div className="content">
                <ul className="desc">
                  <li>청취자님 안녕하세요! DJ 달토 입니다</li>
                  <li>사연을 보낼 닉네임과 받고싶은 답변의 기본 성향을 </li>
                  <li>체크해 보름달이 뜨는 밤, 달로 보내주세요 🌕</li>
                </ul>
                <p className="info">당신의 사연을 기다리는 DJ 달토로부터.</p>
              </div>
              <div className="img-layout">
                <p className="post">Rabbit Post</p>
                <img className="stamp" src={ImgLetterStamp} alt="rabbit stamp img 토끼 스탬프 이미지" />
              </div>
            </div>
          </div>
          <div className="user-data-container">
            <div className="data-box">
              <div className="data-box__title">
                <p>사연을 보낼 닉네임을 입력해 주세요.</p>
              </div>
              <input type="text"
                className="user-nickname"
                autoComplete="off"
                id="user-nickname"
                name="user-nickname"
                placeholder="한글, 영문 포함 12글자 이내로 작성해 주세요."
                value={nickname}
                onBlur={handleBlur}
                onChange={changeHandler} />
            </div>
            <div className="data-box">
              <div className="data-box__title">
                <p>받고싶은 답변의 기본 성향을 알려주세요.</p>
                <span>(언제든 변경이 가능해요.)</span>
              </div>
              <div className="type-btn-wrapper">
                <button onClick={() => setType("F")} className={`type-btn ${type === "F" ? "F" : ""}`}>F</button>
                <button onClick={() => setType("T")} className={`type-btn ${type === "T" ? "T" : ""}`}>T</button>
              </div>
            </div>
            <div className="data-box rows">
              <div className="data-box__title">
                <p>카카오톡 프로필 사진 동기화 여부</p>
              </div>
              <Switch active={profileImageEnabled} setActive={setProfileImageDisable} />              
            </div>
          </div>
        </div>
        <div className="foot">
          <button disabled={!nickname} onClick={patchUserInfo}>{loading ? <CircularProgress size={20} color="inherit" /> : "시작하기"}</button>
        </div>
      </div>
    </div>
  )
}

export default function Register() {
  const [next, setNext] = useState("SignupTerms");

  const [agreements, setAgreements] = useState({
    allAgreed: false,
    agreeToTerms: false,
    agreeToPrivacyPolicy: false,
    emailAdsConsented: false
  });

  const sharedProps = { next, setNext, agreements, setAgreements };
  return (
    <>    
      {next === "SignupTerms" && <SignupTerms {...sharedProps} />}
      {next === "PatchField" && <PatchField {...sharedProps} />}
    </>
  )
}