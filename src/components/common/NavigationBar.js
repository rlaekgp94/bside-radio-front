
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
            return <li key={index} 
            className={`${pathname === item.pathName ? `${item.icon}-on active` : `${item.icon}-off`}`} 
            onClick={() => navigate(item.pathName)}>
              <p>{item.name}</p>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}