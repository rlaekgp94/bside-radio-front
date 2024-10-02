// import { useDispatch, useSelector } from 'react-redux';
// import { setSidebarView } from 'store/modules/ui';
// import ChatLayout from './ChatLayout'
// // import NotiLayout from './NotiLayout'
// import { useEffect } from 'react';


export default function OptionSidebar() {
  // const sidebarView = useSelector(state => { return state?.ui?.sidebarView; });
  // const viewType = useSelector(state => { return state?.ui?.screen.viewType; });
  // const isMobile = viewType.mobile;
  // const dispatch = useDispatch();
  // const closeSidebar = () => {
  //   dispatch(setSidebarView('hidden'));
  // };
  // const control = { closeSidebar }
  // const section = {
  //   chat: <ChatLayout {...control} />,
  //   // noti: <NotiLayout {...control} />
  // }
  // const isLoggedIn = useSelector(state => {
  //   return state?.user?.isLoggedIn;
  // });
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     closeSidebar()
  //   }
  // }, [isLoggedIn])

  // useEffect(() => {
  //   if (isMobile) {
  //     if (sidebarView !== "hidden") {
  //       document.querySelector('html').setAttribute('aria-hidden', 'true');
  //       document.querySelector('html').style.overflow = 'hidden';
  //     } else {
  //       document.querySelector('html').removeAttribute('aria-hidden');
  //       document.querySelector('html').style.overflow = '';
  //     }
  //   }
  // }, [sidebarView])

  return (
    // <div className={`${viewType.mobile ? 'm-option-sidebar' : 'option-sidebar'} ${sidebarView}`}>
    //   <div className={`option-sidebar-inner ${sidebarView}`}>
    //     {section[sidebarView]}
    //   </div>
    // </div>
    <div>test</div>
  )
}