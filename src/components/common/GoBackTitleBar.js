import IconBack from 'assets/Icon/btn-back.svg'
import { useNavigate } from 'react-router-dom';

function GoBackTitleBar({title}) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // -1은 히스토리 스택에서 한 단계 뒤로 이동
  };

  return (
    <div className="go-back-title-bar layout-p">
      <img onClick={handleBack} className="icon" src={IconBack} alt="go back img 뒤로가기 이미지" />
      <p className="title">{title}</p>
    </div>
  )
}

export default GoBackTitleBar;