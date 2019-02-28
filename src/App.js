import 'ress/ress.css';
import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import './App.css';

import { createStore } from 'app/store';
import PWAContainer from 'app/containers/pwa';
import AppBg from 'app/components/app-bg';

import ExchangeRoute from 'app/routes/exchange';
import { reducers as exchangeReducers, exchangeServices } from 'app/components/exchange';


/**
 * Create Store
 * Provide api via thunk, so it can be replaced
 * Core and exchange reducers are also provided separately and optionally
 */
const { store, persistor } = createStore({
  thunkExtraArguments : {
    api : {
      ...exchangeServices,
    },
  },
}, {
  rates    : exchangeReducers.ratesReducer,
  exchange : exchangeReducers.exchangeReducer,
  accounts : exchangeReducers.accountsReducer,
});

export default () => (
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <PWAContainer>
        <AppBg/>
        <main>
          <ExchangeRoute/>
        </main>
      </PWAContainer>
    </PersistGate>
  </Provider>
);
