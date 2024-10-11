
import { useNavigate, useLocation } from "react-router-dom";

import { GNB_ITEMS } from 'constants/gnbList'

export default function NavigationBar() {
  const navigate = useNavigate();
  
  return (
    <div className="navi-bar">
      <div className="navi-bar__inner">
        <ul>
          {GNB_ITEMS.map((item, index) => {
            return <li key={index} onClick={() => navigate(item.pathName)}>{item.name}</li>
          })}
        </ul>
      </div>
    </div>
  )
}