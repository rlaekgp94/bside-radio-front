import { useNavigate } from 'react-router-dom';
import BaseButton from 'components/ui/button/BaseButton';

export default function NotFound() {
  const nav = useNavigate();

  const goToHome = () => {
    nav("/")
  }
  return (
    <div className="error-wrapper">
      <div className="pageNotFound-wrapper">
        <div className="pageNotFound-inner">
          <p>Page not found</p>
          <span>Sorry, the page you were looking for doesn’t exist.</span>
        </div>
        <BaseButton onClick={goToHome} color="primary" label="Go to Home" size="large" />
      </div>
    </div>
  )
}