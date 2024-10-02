import { Outlet } from 'react-router-dom';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import ScrollToTop from 'components/common/ScrollToTop';
import GlobalModal from 'components/modal/Global';
import FixedActionButton from 'components/common/FixedActionButton';

const Layout = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })


  return (
    <div className="root-container">
      <div className="main-content" id="scrollbar">
        <ScrollToTop>
          <Outlet /> 
        </ScrollToTop>
        <FixedActionButton /> 
      </div>
      <GlobalModal />
    </div>
  );
}

export default Layout;