import { useState } from 'react';
import { useSelector } from 'react-redux';
import { movePath } from 'utils/movePath';
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { useSnackbar } from "notistack";
import Dialog from '@mui/material/Dialog';
import LogoImg from 'assets/Logo/logo_image.png'
import { useTranslation } from 'react-i18next'

function SoonModal({ open, handleClose }) {
  const { t } = useTranslation();
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
            <p>{t('commonMsg.soon')}</p>
          </div>
        </div>
      </div>
    </Dialog>
  )
}

export default function GameCard({item, gameData}) {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [modalOpen, setModalOpen] = useState(false);
  const user = useSelector(state => { return state?.user; });
  const { language, isLoggedIn } = user;
  const nav = useNavigate();
  const content = item?.gameTypeID === "lg" ? "casino" : item?.gameTypeID === "vs" ? "slot" : "";
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const modalClose = () => {
    setModalOpen(false);
  };

  const detailGameItem = (item) => {
    const { gameID, commingSoon } = item;
    if (commingSoon) {
      setModalOpen(true);
      return;
    }
    if (!gameID) return;
    if (!isLoggedIn) return enqueueSnackbar({ msg: 'commonMsg.pleaseLogin', variant: "info", action: () => {closeSnackbar()} });
    let pathName = `/${content}/games/${gameID}`;
    const state = {
      gameType: gameData.gameType,
      title: gameData.title,
      iconName: gameData.iconName,
      gameName: item.gameName
    }
    movePath(nav, language, pathName, { gameData: state })
  }
  return (
    <>
      <div onClick={() => detailGameItem(item)}>
        <div className={`game-card-item ${item?.gameID ? "has" : ""}`}>
          {item?.gameID ?
          <>
            <div className="thumbnail">
              {item?.tac === "Daily Wins" && <div className="tag datily-wins"></div>}
              {imageLoaded ? null : <Skeleton sx={{ bgcolor: '#393939' }} animation="wave" variant="rectangular" />}
              <img
                src={`https://api.prerelease-env.biz/game_pic/square/200/${item?.gameID}.png`}
                alt={`${item?.gameName} thumbnail img`}
                style={{ display: imageLoaded ? 'block' : 'none' }}
                onLoad={handleImageLoad}
              />
            </div>
            <div className="hover-wrapper">
              <div className="hover-wrapper__inner">
                <div className="hover-item">
                  <p className="game-name">{item?.gameName}</p>
                  <span className="game-type">{item?.provider}</span>
                </div>
              </div>
            </div>
          </> :
          <Skeleton sx={{ bgcolor: '#393939' }} className="thumbnail" animation="wave" variant="rectangular" /> }
        </div>
      </div>
      <SoonModal open={modalOpen} handleClose={modalClose} />
    </>
  )
}