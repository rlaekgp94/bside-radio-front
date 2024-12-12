import GifRabbitRead from 'assets/Content/read-rabbit.gif';

import GifCreate from 'assets/Content/reports/reports-create.gif';

function Loading({type}) {
  
  return ( 
    <div className="reports-loading">
      <div className="img-wrapper">
        <img src={GifCreate} alt="리포트 생성 이미지 GIF" />
      </div>
      <div className="desc">
        {type === "create" ? 
        <p>리포트를 생성하고있어요!</p> :
        <p>생성할 수 있는<br />리포트를 찾고있어요...</p>}
      </div>
    </div>
  )
  }
  
  export default Loading;