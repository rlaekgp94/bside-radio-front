import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import { setIsExpanded, setSidebarView } from 'store/modules/ui';
// import { movePath } from 'utils/movePath';


export default function MobileNavigation() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  // const sidebarView = useSelector(state => { return state?.ui?.sidebarView; });
  // const isExpanded = useSelector(state => { return state?.ui?.isExpanded; });

  // const disableToggle = () => {
  //   if (sidebarView !== "hidden") dispatch(setSidebarView('hidden'))
  //   else if (isExpanded) dispatch(setIsExpanded(false));
  // }

  // const toggleMenu = () => {
  //   if (isMobile && sidebarView !== "hidden") {
  //     dispatch(setSidebarView('hidden'))
  //   }
  //   dispatch(setIsExpanded(!isExpanded));
  // }

  // const toggleSidebar = (view) => {
  //   if (isMobile && isExpanded) {
  //     dispatch(setIsExpanded(false));
  //   }
  //   view !== sidebarView ? dispatch(setSidebarView(view)) : dispatch(setSidebarView('hidden'));
  // }

  const handlerPath = (item) => {
    // if (item.isLoggedIn && !isLoggedIn) return enqueueSnackbar({ msg: "commonMsg.pleaseLogin", variant: "info", action: () => {closeSnackbar()} })
    // if (item.component) {
    //   disableToggle()
    //   dispatch(openModal({modalType: item.component}));
    // } else if (item.pathName) {
    //   disableToggle()
    //   movePath(nav, lang, item.pathName)
    // } else if (item.handler) {
      item.handler();
    // }
  }

  const list = [
    {
      name: 'Browse',
      icon: 'browse',
      isLoggedIn: false,
      // handler: () => { toggleMenu() }
    },
    {
      name: 'Casino',
      icon: 'casino',
      pathName: '/casino',
      isLoggedIn: false,
    },
    {
      name: 'Slot',
      icon: 'slot',
      pathName: '/slot',
      isLoggedIn: false,
    },
    {
      name: 'Wallet',
      icon: 'wallet',
      component: 'Wallet',
      isLoggedIn: true,
    },
    {
      name: 'Chat',
      icon: 'chat',
      isLoggedIn: true,
      // handler: () => { toggleSidebar('chat') }
    },
  ]
  return (
    <div className="mobile-navigation">
      <div className="mobile-navigation__inner">
        <ul className="nav-list">
          {list.map((item, index) => {
            return <li key={index} className="nav-item">
              <div className={`nav-item__inner ${item.icon}`} onClick={() => handlerPath(item)}>
                <p>{item.icon}</p>
              </div>
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}