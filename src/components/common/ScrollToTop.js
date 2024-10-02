import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

export default function ScrollToTop(props) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.getElementById('scrollbar').scrollTo(0, 0);
  }, [pathname]);

  return <>{props.children}</>;
}