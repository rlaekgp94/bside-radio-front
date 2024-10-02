import { useState, useEffect } from 'react';
import { CircularProgress } from '@mui/material';
import { useTranslation } from 'react-i18next'


const list = [
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: false,
  },
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: false,
  },
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: true,
  },
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: true,
  },
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: true,
  },
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: true,
  },
  {
    date: "2023. 12. 20. 5:39:18",
    title: "📢 Casino Maintenance Alert",
    content: "Lorem ipsum dolor sit amet consectetur. Porttitor nunc pulvinar tristique eget fermentum ipsum dignissim. Purus et amet elementum eu integer adipiscing tellus. test입니다 test입니다2",
    read: true,
  },
]

export default function NotiLayout({closeSidebar}) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  // const [list, setList] = useState([]);
  const [active, setActive] = useState(null);
  const toggle = (index) => {
    if (active === index) {
      setActive(null);
    } else {
      setActive(index);
    }
  }
  return (
    <>
      <div className="option-sidebar-inner__head">
        <div className="info-wrapper">
          <p className="info-wrapper__title">{t('component.noti.title')}</p>
          <button className="readAll-btn">{t('component.noti.readAll')}</button>
        </div>
        <button className="close-btn" onClick={closeSidebar}></button>
      </div>
      <div className="option-sidebar-inner__body">
      {loading ? (
          <div className="info-center">
            <CircularProgress color="inherit" />
          </div>
        ) : list?.length === 0 ? (
          <div className="info-center">
            <p>{t('component.noti.noHistory')}</p>
          </div>
        ) : (
          <div className="noti-list">
            {list.map((item, index) => {
              return <div key={index} className={`noti-list-item ${!item.read ? "new" : ""}`}>
                <span className="date">{item.date}</span>
                <p className="title">{item.title}</p>
                <p className={`content ${active !== index ? "normal" : ""}`}>{item.content}</p>
                <button onClick={() => toggle(index)} className={`showAll-btn ${active === index ? "isActive" : ""}`}><p>{t('component.noti.show')}</p></button>
              </div>
            })}
          </div>
        )}

    </div>
    </>
  )
}