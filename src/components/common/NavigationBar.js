
import { useNavigate, useLocation } from "react-router-dom";

import { GNB_ITEMS } from 'constants/gnbList'

export default function NavigationBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  return (
    <div className="navi-bar">
      <div className="navi-bar__inner">
        <ul>
          {GNB_ITEMS.map((item, index) => {
            const isActive =
              item.pathName === '/'
                ? pathname === item.pathName
                : pathname.startsWith(item.pathName);
            return <li key={index} 
            className={`${isActive ? `${item.icon}-on active` : `${item.icon}-off`}`} 
            onClick={() => navigate(item.pathName)}>
              <p>{item.name}</p>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}