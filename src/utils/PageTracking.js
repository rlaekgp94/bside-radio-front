import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import mixpanel from 'mixpanel-browser';

const PageTracking = ({ userId }) => {  
  const location = useLocation();

  useEffect(() => {
    if (!userId) {
      return;
    }
    const pageName = location.pathname === "/" ? "home" : location.pathname.replace("/", "");
    const eventName = `view_${pageName}`;

    mixpanel.track(eventName, {
      distinct_id: userId,
    });

  }, [location, userId]);

  return null;
};

export default PageTracking;
