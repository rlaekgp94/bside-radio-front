import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ScrollToTop(props) {
  const isMobile = useSelector(state => {
    return state?.ui?.screen?.viewType.mobile;
  });
  const { pathname } = useLocation();

  useEffect(() => {
    if (isMobile) {
      window.scrollTo(0, 0);
    } else {
      document.getElementById('scrollbar').scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{props.children}</>;
}