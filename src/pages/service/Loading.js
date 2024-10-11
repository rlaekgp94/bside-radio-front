
import GifRabbitRead from 'assets/Content/read-rabbit.gif';

import ImgMicRead from 'assets/Content/read-mic.png';
import LogoImg from 'assets/Logo/logo_w.svg';

function Loading() {
  
  return ( 
    <div className="result layout">
      <div className="result__inner">
        <div className="head">
          <img className="logo" src={LogoImg} alt="logo img 로고 이미지" />
        </div>
        <div className="body">
          <div className="script">
            <div className="script__inner">
              <p className="desc1">내 사연을 채택중...</p>
              <p className="desc2">DJ가 내사연을 읽는중...</p>
              <p className="desc3">답변을 작성하는 중...</p>
            </div>
          </div>
          <div className="assets-container">
            <div></div>
            <div className="box">
              <img className="mic" src={ImgMicRead} alt="mic img 마이크 이미지" />
              <img className="rabbit" src={GifRabbitRead} alt="rabbit img 편지를 읽고 있는 토끼 이미지" />
            </div>
          </div>
        </div>
      </div>
      <div className="result__footer">
      </div>
    </div>
  )
  }
  
  export default Loading;