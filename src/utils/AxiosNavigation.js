import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axios';


export default function AxiosNavigation() {
  const navigate = useRef(useNavigate());

  useEffect(() => {
    if (process.env.REACT_APP_ENV === 'development') return;
    
    const intercetpor = axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;
        if (statusCode) {          
          navigate.current(`/error/${statusCode}`
          //   , {
          //   state: {
          //     errorCode: error.code,
          //     errorMessages: errorMessages[statusCode] 
          //   },
          // }
        );}
        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(intercetpor);
    };
  }, []);
  return <></>;
}