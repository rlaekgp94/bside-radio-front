
import { useTranslation } from 'react-i18next'

export default function LinkListItem(props) {
  const { t } = useTranslation();
  const { groupInfo, items } = props;
  return (
    <div className="link-list-component">
      <div className="link-list-component__header">
        <div className="title">
          <div className="title-info">
            <i className={`icon-set ${groupInfo.iconName}`}></i>
            <p>{t(`pages.home.${groupInfo.title}.title`)}</p>
          </div>
          <button onClick={groupInfo.view} className="view-all">{t('commonDesc.viewAll')}</button>
        </div>
      </div>
      <ul className="link-list-component__body">
        {items.map((item, index) => {
          return <li key={index}>
            <div className="title" onClick={() => window.open(item.link)}>
              <p>{item.title}</p>
            </div>
            <span>{item.date}</span>
          </li>
        })}
      </ul>
    </div>
  )
}