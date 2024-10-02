import { useNavigate } from 'react-router-dom';
import IconBack from 'assets/Icon/btn-back.svg'

function GoBackTitleBar({title}) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="go-back-title-bar layout-p">
      <div className="go-back-title-bar__inner">        
        <img onClick={handleBack} className="icon" src={IconBack} alt="go back img 뒤로가기 이미지" />
        <p className="title">{title}</p>
      </div>
    </div>
  )
}

export default GoBackTitleBar;