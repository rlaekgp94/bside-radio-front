import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearUserInfo } from 'store/modules/user';
import { DATA } from 'constants'

import UserProfile from 'components/item/UserProfile'
import IconPin from 'assets/Icon/icon-pinned-filled.svg'
import IconDesc from 'assets/Icon/icon-file-description.svg'
import IconMinus from 'assets/Icon/icon-circle-minus.svg'
import IconClose from 'assets/Icon/icon-out.svg'
import IconLink from 'assets/Icon/icon-external-link.svg'

export default function MyPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(state => { return state?.user.userInfo; });
  
  const setList = [
    {
      name: "공지사항",
      icon: IconPin,
      link: "#"
    },
    {
      name: "개인정보처리방침",
      icon: IconDesc,
      link: DATA.PRIVACY_POLICY_URL
    },
    {
      name: "계정 탈퇴",
      icon: IconMinus,
      isFunction: () => {
        console.log("계정 탈퇴")
      }
    },
    {
      name: "로그아웃",
      icon: IconClose,
      isFunction: () => {
        dispatch(clearUserInfo())
      }
    },
  ]

  const move = (item) => {
    if (item.link) {
      window.open(item.link, '_blank');
    } else if (item.isFunction) {
      item.isFunction()
    }
  }

  return (
    <div className="myPage">
      <div className="myPage__inner">
        <div className="user-zone">
          <div className="user-zone__data">
            <UserProfile />
            <div className="nickname">
              <p>{userInfo?.nickname ? userInfo.nickname : "user"}</p>
            </div>
          </div>
          <button onClick={() => navigate("/editProfile")} className="correction-btn">프로필 수정하기</button>
        </div>
        <div className="common-zone layout-p">
          <p className="common-zone__title">환경설정</p>
          <ul className="common-zone__list">
            {setList.map((item, index) => {
              return <li key={index} onClick={() => move(item)}>
                <div className="title">
                  <img className="icon" src={item.icon} alt={`${item.name} 아이콘 icon`} />
                  <p>{item.name}</p>
                </div>
                {item.link ? <img className="icon" src={IconLink} alt="링크 아이콘 link icon" /> : null}
              </li>
            })}
          </ul>
        </div>
      </div>
    </div>
  )
}