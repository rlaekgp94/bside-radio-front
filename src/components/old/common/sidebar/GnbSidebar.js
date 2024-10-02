import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { GNB_ITEMS } from 'constants/gnbList'
import { movePath } from 'utils/movePath';
import { openModal } from 'store/modules/components';
import { setIsExpanded } from 'store/modules/ui';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Backdrop from '@mui/material/Backdrop';
import BaseButton from 'components/ui/button/BaseButton';
import { useSnackbar } from "notistack";
import { useTranslation } from 'react-i18next'
import MobileGnbBar from './MobileGnbBar';
import useAuth from 'hooks/useAuth';
// import { GoogleLogin } from '@react-oauth/google';

let init = true;

const MenuTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: 'var(--background-inverse)',
    color: 'var(--text-inverse)',
    maxWidth: 220,
    fontSize: '14px',
    fontWeight: '600',
    lineHeight: '18px',
    fontFamily: 'Pretendard',
    borderRadius: '2px',
    padding: '3px 8px',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'var(--background-inverse)',
    fontSize: 8,
  },
}));

const MenuButton = ({toggleMenu, isExpanded}) => {
  return (
    <button onClick={toggleMenu} className={`menu-item icon-r ${isExpanded ? 'unexpand' : 'expand'}`}></button>
  )
}


function GnbSidebar() {
  const isExpanded = useSelector(state => { return state?.ui?.isExpanded; });
  const viewType = useSelector(state => { return state?.ui?.screen.viewType; });
  const user = useSelector(state => { return state?.user; });
  const { userInfo, isLoggedIn, language: lang, betTotal } = user;
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const isMobile = viewType.mobile;
  const { logout, snsLogin } = useAuth();

  useEffect(() => {
    if (isMobile) {
      if (isExpanded) {
        document.querySelector('html').setAttribute('aria-hidden', 'true');
        document.querySelector('html').style.overflow = 'hidden';
      } else {
        document.querySelector('html').removeAttribute('aria-hidden');
        document.querySelector('html').style.overflow = '';
      }
    }
  }, [isExpanded]);

  const toggleMenu = () => {
    dispatch(setIsExpanded(!isExpanded));
  };

  const handlerPath = (item) => {
    if (item.isLoggedIn && !isLoggedIn) return enqueueSnackbar({ msg: 'commonMsg.pleaseLogin', variant: "info", action: () => {closeSnackbar()} })
    if (item.component) dispatch(openModal({modalType: item.component}));
    else movePath(nav, lang, item.pathName)
    if (isMobile) dispatch(setIsExpanded(!isExpanded));
  }

  useEffect(() => {
    if (init) {
      init = false;
    }

    if (!userInfo?.email) {
      window.google?.accounts.id.initialize({
        client_id: '347323537061-ujo0rlpuhsasgk213t9e1jisash4n6c3.apps.googleusercontent.com',
        callback: (credentialResponse) => {
          // Send the Google token to Cognito to federate the user
          snsLogin("Google");
        }
      });
      window.google?.accounts.id.prompt();
      // console.log(ini, promp)
    }
  }, []);

  const openSignInModal = () => {dispatch(openModal({modalType: "SignIn"}));};
  // const gnbList = {};

  // for (const [key, items] of Object.entries(GNB_ITEMS)) {
  //   const filteredItems = items.filter(item => isLoggedIn || !item.isLoggedIn);
  //   if (filteredItems.length > 0) {
  //     gnbList[key] = [...filteredItems];
  //   }
  // }
  return (
    <>
      {!isMobile ?
      <aside className={`gnb-sidebar ${!isExpanded ? 'close' : 'open'}`}>
        {isExpanded ?
        <div className={`gnb-sidebar-normal ${!isExpanded ? 'hidden' : 'show'} ${viewType.tablet ? 'layer-sidebar' : ''} ${init ? 'init' : ''}`}>
          <div className="gnb-side-bar-header rows">
            <div className="head">
              <div className="logo"></div>
              <MenuButton isExpanded={isExpanded} toggleMenu={toggleMenu} />
            </div>
            <div className="body">
              {userInfo?.email ?
              <div className="userIn">
                <div className="userIn__inner">
                  {betTotal?.currentTier && <img className="grade" src={require(`assets/Grade/${betTotal?.currentTier}.png`)} alt={`${betTotal?.currentTier} icon`} />}
                  <div className="userInfo">
                    <p>{userInfo.username}</p>
                    <span>{betTotal?.currentTier ? t(`tier.${betTotal.currentTier}`) : "-"}</span>
                  </div>
                </div>
                <button onClick={() => logout()} className="logout-btn">{t("commonDesc.logout")}</button>
              </div> :
              <div className="userOut">
                <BaseButton onClick={openSignInModal} color="primary" label={t('commonDesc.signIn')} size="small" />
              </div>
              }
            </div>
          </div>
          <div className="gnb-sidebar-normal__list">
            {Object.entries(GNB_ITEMS).map(([key, value]) => {
              return <div className="menu-details" key={value}>
              <p className="menu-details__title">{t(`nav.${key}`)}</p>
              <ul className="menu-details__content">
                {value.map((item, index) => {
                  return <li key={index} onClick={()=> handlerPath(item)} className={`${pathname.includes(item.pathName) ? "isActive" : ""}`}>
                    <div className={`icon-r ${item.icon}`}></div>
                    <p className="name">{t(`gnb.${item.icon}`)}</p>
                  </li>
                })}
              </ul>
            </div>
            })}
          </div>
        </div> :
        <div className={`gnb-sidebar-small ${isExpanded ? 'hidden' : 'show'} ${init ? 'init' : ''}`}>
          <div className="gnb-side-bar-header">
            <MenuButton isExpanded={isExpanded} toggleMenu={toggleMenu} />
          </div>
          <div className="gnb-sidebar-small__list">
            {Object.entries(GNB_ITEMS).map(([key, value]) => {
              return <ul className="menu-group" key={value}>
                {value.map((item, index) => {
                  return <MenuTooltip key={index} title={item.name} placement="right" arrow>
                    <li key={index} onClick={()=> handlerPath(item)} className={`menu-item ${pathname.includes(item.pathName) ? "isActive" : ""}`}>
                      <div className={`icon-r ${item.icon}`}></div>
                    </li>
                  </MenuTooltip>
                })}
              </ul>
            })}
          </div>
        </div>
        }
      </aside>
      :
      <MobileGnbBar isExpanded={isExpanded} handlerPath={handlerPath} />
      }
      {(viewType.tablet && isExpanded) &&
        <Backdrop sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', zIndex: 899 }}
          open={viewType.tablet && isExpanded} onClick={toggleMenu}
        ></Backdrop>
      }

    </>
  );
}
export default GnbSidebar;