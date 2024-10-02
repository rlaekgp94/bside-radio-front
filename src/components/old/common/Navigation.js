import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
// import { setIsExpanded, setSidebarView } from 'store/modules/ui';


export default function MobileNavigation() {
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
    nav(item.pathName);
    // if (item.isLoggedIn && !isLoggedIn) return enqueueSnackbar({ msg: "commonMsg.pleaseLogin", variant: "info", action: () => {closeSnackbar()} })
    // if (item.component) {
    //   disableToggle()
    //   dispatch(openModal({modalType: item.component}));
    // } else if (item.pathName) {
    //   disableToggle()
    //   movePath(nav, lang, item.pathName)
    // } else if (item.handler) {
    //   item.handler();
    // }
  }

  const list = [
    {
      name: 'Main',
      icon: 'main',
      pathName: '/',
      isLoggedIn: false,
    },
    {
      name: 'Test',
      icon: 'test',
      pathName: '/test',
      isLoggedIn: false,
    },
    {
      name: 'Quiz',
      icon: 'quiz',
      pathName: '/quiz',
      isLoggedIn: false,
    },
    {
      name: 'Setting',
      icon: 'setting',
      pathName: '/setting',
      isLoggedIn: false,
    },
    // {
    //   name: 'Browse',
    //   icon: 'browse',
    //   isLoggedIn: false,
    //   // handler: () => { toggleMenu() }
    // },
    // {
    //   name: 'Slot',
    //   icon: 'slot',
    //   pathName: '/slot',
    //   isLoggedIn: false,
    // },
    // {
    //   name: 'Wallet',
    //   icon: 'wallet',
    //   component: 'Wallet',
    //   isLoggedIn: true,
    // },
    // {
    //   name: 'Chat',
    //   icon: 'chat',
    //   isLoggedIn: true,
    //   // handler: () => { toggleSidebar('chat') }
    // },
  ]
  return (
    <div className="navigation">
      <div className="navigation__inner">
        <ul className="nav-list">
          {list.map((item, index) => {
            return <li key={index} className="nav-item" onClick={() => handlerPath(item)}>
              {/* <div className={`nav-item__inner ${item.icon}`} onClick={() => handlerPath(item)}> */}
                <p>{item.name}</p>
              {/* </div> */}
            </li>
          })}
        </ul>
      </div>
    </div>
  )
}