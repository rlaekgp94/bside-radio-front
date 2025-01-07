import { useNavigate } from 'react-router-dom';
import IconBack from 'assets/Icon/icon-close.svg'

function CloseTitleBar({title, move}) {
  const navigate = useNavigate();
  
  const handleBack = () => {
    if (move) {
      navigate(move);
      return;
    }
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <div className="close-title-bar">
      <div className="close-title-bar__inner">        
        <p className="title">{title}</p>
        <img onClick={handleBack} className="icon" src={IconBack} alt="go back img 뒤로가기 이미지" />
      </div>
    </div>
  )
}

export default CloseTitleBar;