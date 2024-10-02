import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { getGameListAPI } from 'api/pragmatic'
import { useSnackbar } from "notistack";
import { movePath } from 'utils/movePath';
import { GNB_ITEMS } from 'constants/gnbList'
import { OutlinedInput } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { setIsExpanded } from 'store/modules/ui';
import { useTranslation } from 'react-i18next'
import Dialog from '@mui/material/Dialog';
import LogoImg from 'assets/Logo/logo_image.png'


function SoonModal({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className="base-dialog-wrapper small"
    >
      <div className="base-dialog-inner bottom-p-32 m-bottom-p-24">
        <div className="base-dialog-header">
          <button onClick={handleClose} className="close-btn"></button>
        </div>
        <div className="base-dialog-body soon">
          <div className="soon-inner">
            <img src={LogoImg} alt="ace casino logo img" />
            <p>COMING SOON</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}


export default function MobileGnbBar({isExpanded, handlerPath}) {
  const { pathname } = useLocation();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const user = useSelector(state => { return state?.user; });
  const { language, isLoggedIn } = user;
  const [keyword, setKeyword] = useState(null);
  const [list, setList] = useState([]);
  const [time, setTime] = useState(null);
  const [delay, setDelay] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const modalClose = () => {
    setModalOpen(false);
  };


  const isChange = (e) => {
    const gap = e.timeStamp - time;
    const value = e.target.value;
    setKeyword(value);
    if (!value) {
      setList([]);
      clearTimeout(delay);
      setLoading(false)
      return;
    }
    if (value.length >= 3) {
      setLoading(true)
      clearTimeout(delay);
      setDelay(setTimeout(() => {
        getGameSearch(value);
      }, 1000))

      if (time && gap >= 5000) {
        clearTimeout(delay);
        setDelay(setTimeout(() => {
          getGameSearch(value);
        }, 2000))
      }
    }

    setTime(e.timeStamp);
  }
  const getGameSearch = async (value) => {
    try {
      const res = await getGameListAPI("", value);
      // console.log("res", res?.games)
      setList(res?.games)
      setLoading(false)
    }
    catch(e) {
      console.log("getGameListAPI e: ", e)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isExpanded) {
      setKeyword(null);
      setTime(null);
      setDelay(null);
      setLoading(false);
      setList([]);
      setShowSearch(false);
    }
  }, [isExpanded])

  useEffect(() => {
    if (!keyword) {
      setList([]);
      return;
    }
  }, [keyword])

  const detailGameItem = (item) => {
    if (item.commingSoon) {
      setModalOpen(true);
      return;
    }
    if (!item.gameID) return;
    if (!isLoggedIn) return enqueueSnackbar({ msg: 'commonMsg.pleaseLogin', variant: "info", action: () => {closeSnackbar()} });
    const content = item.gameTypeID === "lg" ? "casino" : item.gameTypeID === "vs" ? "slot" : "";
    let pathName = `/${content}/games/${item.gameID}`;
    const gameData = { gameType: item.gameTypeID, title: content, iconName: content, gameName: item.gameName }
    movePath(nav, language, pathName, { gameData })
    dispatch(setIsExpanded(false));
  }

  const onBlur = () => {
    setShowSearch(false);
    setKeyword(null)
  }

  const onChange = (e)=> {
    if (isChange) {
      isChange(e)
      return;
    }
    const inputValue = e.target.value;
    setKeyword(inputValue)
  }

  return (
    <>
      <div className={`m-gnb-sidebar ${!isExpanded ? 'close' : 'open'}`}>
        <div className="m-gnb-sidebar__inner">
          <div className="m-gnb-sidebar-header">
            <div className="search-input-wrapper">
              <OutlinedInput
                className="m-total-search"
                autoComplete="off"
                placeholder={t("component.search.placeholder")}
                name="m-total-search"
                id="m-total-search"
                type={"text"}
                value={keyword || ''}
                onChange={onChange}
                onFocus={() => setShowSearch(true)}
                startAdornment={<div className="search-icon"></div>}
                endAdornment={<button onClick={onBlur} className="close-btn"></button>}
                />
            </div>
          </div>
          <div className="m-gnb-sidebar-list">
            <div className="m-gnb-sidebar-list__inner">
              {showSearch ? <div className="search-details">
                {loading ? (
                  <div className="loading-wrap"><CircularProgress size={30} color="inherit" /></div>
                  ) : list?.length ? (
                    <div className="result">
                      <p className="result__title">{t("component.search.result")}</p>
                      <ul className="result__list">
                        {list.map((item, index) => (
                          <li onClick={() => detailGameItem(item)} key={index}><p>{item.gameName}</p></li>
                        ))}
                      </ul>
                    </div>
                  ) : keyword?.length ? (
                    <p className="infos">{t("component.search.noResult")}</p>
                  ) : (
                    <p className="infos">{t("component.search.info")}</p>
                  )
                }
              </div> : Object.entries(GNB_ITEMS).map(([key, value]) => {
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
          </div>
        </div>
      </div>
      <SoonModal open={modalOpen} handleClose={modalClose} />
    </>
  )
}