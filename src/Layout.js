import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { setScreen } from 'store/modules/ui';
import { useSelector, useDispatch } from 'react-redux';

import ScrollToTop from 'components/common/ScrollToTop';
import GlobalModal from 'components/modal/Global';
import FixedActionButton from 'components/common/FixedActionButton';

import useWindowSizeCustom from "utils/useWindowSizeCustom";

const Layout = () => {
  const { pathname } = useLocation();
  const screenSize = useWindowSizeCustom();
  const dispatch = useDispatch();

  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`)
  
  window.addEventListener('resize', () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  })

  useEffect(() => {
    dispatch(setScreen(screenSize));
  }, [screenSize, dispatch]);

  return (
    <div className="root-container">
      <div className="main-content" id="scrollbar">
        <ScrollToTop>
          <Outlet /> 
        </ScrollToTop>
        {pathname === '/' && <FixedActionButton />}    
      </div>
      <GlobalModal />
    </div>
  );
}

export default Layout;

/**
 * 
 * 
      <button onClick={() => nav("/login")}>login</button><br />
      <button onClick={() => nav("/register")}>register</button><br />
      <button onClick={() => nav("/result")}>result</button>
 */