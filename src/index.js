import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import store from './store/configureStore';
import './styles/style.scss';
import AxiosNavigation from './utils/AxiosNavigation';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AxiosNavigation />
      <App />
    </BrowserRouter>
  </Provider>
);

serviceWorkerRegistration.unregister();
reportWebVitals();
