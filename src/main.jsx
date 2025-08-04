import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { persistor } from './redux/Store'
import store from './redux/Store';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import i18next from 'i18next';
import global_en from './translation/en/global.json';
import global_tr from './translation/tr/global.json';
import { I18nextProvider } from 'react-i18next';

i18next.init({
  interpolation: {
    escapeValue: false // React already does escaping
  },
  lng: 'en',
  resources: {
    en: {
      global: global_en
    },
    tr: {
      global: global_tr
    }
  }
});



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <I18nextProvider i18n={i18next}>
          <App />
        </I18nextProvider>
      </BrowserRouter>
    </PersistGate>
    </Provider>
  
);

