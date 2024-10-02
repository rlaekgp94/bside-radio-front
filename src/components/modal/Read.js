import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectModal, closeModal } from 'store/modules/components';

import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';

import { DATA } from 'constants'

import IconClose from 'assets/Icon/icon-close-b.svg'
import ImgLetterStampF from 'assets/Content/f-letter-stamp.svg'
import ImgLetterStampT from 'assets/Content/t-letter-stamp.svg'
import ImgRabbitPostF from 'assets/Content/f-rabbit-post.svg'
import ImgRabbitPostT from 'assets/Content/t-rabbit-post.svg'

const mock = {
  id: 1,
  content: "지금 직장을 다니고 있지만, 오래전부터 창업에 대한 생각을 해왔습니다. 하지만 창업이 현실적으로 가능한지, 위험 부담이 너무 큰 것은 아닌지 걱정이 됩니다.",
  tag: ["창업", "비즈니스", "결정"],  
  replyId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  reply: {
    message_f: "그 꿈을 이루기 위해 도전해볼 가치가 있어. 네가 정말로 열정을 가지고 있다면, 실패하더라도 후회하지 않을 거야. 꿈은 이루기 위해 있는 거니까, 마음이 가는 대로 가봐!",
    message_t: "너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. 너가 하려는 사업이...시장에서 경쟁력이 있는지 먼저 냉정하게 분석해봐. "
  },
  preference: "F"
}

const MessageList = ({ reply, preference }) => {
  const messages = [
    { content: reply.message_f, type: 'F', postImg: ImgRabbitPostF, stmapImg: ImgLetterStampF },
    { content: reply.message_t, type: 'T', postImg: ImgRabbitPostT, stmapImg: ImgLetterStampT },
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
            <img className="post" src={message.postImg} alt="rabbit post text 토끼 편지 문구 이미지" />
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
  const { item } = data;

  const handleClose = () => { dispatch(closeModal()); };

  const userEmail = "danyekgp@gmail.com"

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
              <p className="id">#{userEmail === item.email ? item.date : `${item.id}.`} </p>
              <p className="info">{userEmail === item.email ? "내 사연 🌕" : "누군가의 사연 🌕"}</p>
            </div>
          </div>
          <div className="card-content">
            <p className="card-content__desc">{item.content}</p>
            <ul className="card-content__tags">
              {item.tag.map((itm, idx) => {
                return <li key={idx}><p>#{itm}</p></li>
              })}
            </ul>
          </div>
        </div>
        <MessageList reply={item.reply} preference={item.preference} />
      </div>
    </Dialog>
  )
}