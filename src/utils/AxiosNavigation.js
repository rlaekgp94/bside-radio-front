import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from './axios';


export default function AxiosNavigation() {
  const navigate = useRef(useNavigate());

  useEffect(() => {
    const intercetpor = apiClient.interceptors.response.use(
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
      apiClient.interceptors.response.eject(intercetpor);
    };
  }, []);
  return <></>;
}