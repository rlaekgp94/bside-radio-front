import { useLocation, useParams, useNavigate } from 'react-router-dom';

import { getCookie } from 'utils/cookie';

import LogoImg from 'assets/Logo/logo_s.svg';
import Img4XXError from 'assets/Content/error/4xx_error_image.png'
import Img5XXError from 'assets/Content/error/5xx_error_image.png'

const errorMessages = {
  400: '잘못된 요청입니다.<br />요청을 다시 확인해주세요.',
  401: '인증이 필요합니다.<br />로그인 후 다시 시도해주세요.',
  403: '권한이 없습니다.<br />접근이 거부되었습니다.',
  404: '찾을 수 없는 페이지입니다.',
  429: '너무 많은 요청을 보냈습니다.<br />잠시 후 다시 시도해주세요.',
  500: '서버 내부 오류가 발생했습니다.',
  502: '잘못된 게이트웨이입니다.',
  503: '서비스를 이용할 수 없습니다.<br />나중에 다시 시도해주세요.',
  504: '게이트웨이 타임아웃입니다.',
};

export default function NotFound() {
  const nav = useNavigate();
  const { code } = useParams();
  const userData = getCookie('--user-data');
  // const location = useLocation();
  // const { errorCode, errorMessages } = location.state || {};
  // console.log(errorCode, code, errorMessages)

  const movePage = () => {
    if (userData) {
      nav("/")
    } else {
      nav("/login")
    }
  }

  return (
    <div className="error">
      <div className="error__inner">
        <div className="head">
          <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        </div>
        <div className="body">
          <div className="img-wrapper">
            {code >= 400 && code < 500 ?
            <img className="img4xx" src={Img4XXError} alt="error 4xx img 4xx 에러 이미지" /> :
            code >= 500 && code < 600 ?
            <img className="img5xx" src={Img5XXError} alt="error 5xx img 5xx 에러 이미지" /> :
            null}
          </div>
          <div className="body__desc">
            <p className="code">{code ? `${code} ERROR` : "-"}</p>
            <p className="message" dangerouslySetInnerHTML={{ __html: errorMessages?.[code] ? errorMessages[code] : "-" }}></p>
          </div>
        </div>
        <div className="foot">
          <button onClick={movePage}>홈으로 가기</button>
        </div>
      </div>
    </div>
  )
}