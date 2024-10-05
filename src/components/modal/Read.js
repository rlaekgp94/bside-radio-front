import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';

import { DATA } from 'constants'

import IconClose from 'assets/Icon/icon-close-b.svg'
import ImgLetterStampF from 'assets/Content/f-letter-stamp.svg'
import ImgLetterStampT from 'assets/Content/t-letter-stamp.svg'

const formattedDates = (isoDate) => {
  const date = new Date(isoDate);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  
  const formattedDate = `${year}.${month}.${day}`;

  return formattedDate;
}

const MessageList = ({ reply, preference }) => {
  const messages = [
    { content: reply.message_f, type: 'F', stmapImg: ImgLetterStampF },
    { content: reply.message_t, type: 'T', stmapImg: ImgLetterStampT },
  ];

  const sortedMessages = messages.sort((a, b) => {
    return a.type === preference ? -1 : 1;
  });

  return (
    <ul className="message">
      {sortedMessages.map((message, index) => (
        <li key={index} className={`message__inner type-${message.type}`}>
          <div className="content-layout">
            <p className="title">{message.type === "F" ? "F의 답은," : "T의 답은,"}</p>
            <p className="desc">{message.content}</p>
          </div>
          <div className="img-layout">
            {/* <img className="post" src={message.postImg} alt="rabbit post text 토끼 편지 문구 이미지" /> */}
            <p className={`post color-${message.type}`}>Rabbit Post-{message.type}</p>
            <img className="stamp" src={message.stmapImg} alt="rabbit stamp img 토끼 스탬프 이미지" />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default function Read() {
  const dispatch = useDispatch();
  const { modalType, isOpen, data } = useSelector(selectModal);
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  const { item, id } = data;

  const handleClose = () => { dispatch(closeModal()); };

  return (
    <Dialog
      open={modalType === "Read" && isOpen}
      onClose={handleClose}
      className="base-dialog-wrapper Read"
    >      
      <div className="base-dialog-header">
        <img className="close-btn" onClick={handleClose} src={IconClose} alt="close btn img 닫기 버튼 이미지" />
      </div>
      <div className="base-dialog-inner">
        <div className="card">         
          <div className="card-title">
            <img className="card-title__profile" src={DATA.defaultProfile} alt="profile img" />
            <div className="card-title__desc">
              <p className="id">#{userInfo?.userId === item?.userId ? formattedDates(item?.createdAt) : `${id+1}.`} </p>
              <p className="info">{userInfo?.userId === item?.userId ? "내 사연 🌕" : "누군가의 사연 🌕"}</p>
            </div>
          </div>
          <div className="card-content">
            <p className="card-content__desc">{item.content}</p>
            {/* <ul className="card-content__tags">
              {item.tag.map((itm, idx) => {
                return <li key={idx}><p>#{itm}</p></li>
              })}
            </ul> */}
          </div>
        </div>
        <MessageList reply={item.reply} preference={item.preference} />
      </div>
    </Dialog>
  )
}