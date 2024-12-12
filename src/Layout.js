import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';

import ScrollToTop from 'components/common/ScrollToTop';
import GlobalModal from 'components/modal/Global';
import NavigationBar from 'components/common/NavigationBar';
import FixedActionButton from 'components/common/FixedActionButton';

const Layout = ({children}) => {
  const sessionLoading = useSelector(state => { return state?.user.sessionLoading; });
  const { pathname } = useLocation();
  const paths = ['/', '/memoryBox', '/myPage', '/reports', '/reports/week']; // community

  const vh = window.innerHeight * 0.01;
  const pvh = window.innerHeight;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  document.documentElement.style.setProperty('--pvh', `${pvh}px`)
  
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    const pvh = window.innerHeight;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    document.documentElement.style.setProperty('--pvh', `${pvh}px`)
  })

  return (
    <div className="root-container">
      <div className={`main-content ${paths.includes(pathname) && !sessionLoading ? "main-navi-content" : ""}`} id="scrollbar">
        <ScrollToTop>
          {children}
        </ScrollToTop>
        <FixedActionButton /> 
      </div>
      {paths.includes(pathname) && !sessionLoading && <NavigationBar />}
      <GlobalModal />
    </div>
  );
}

export default Layout;