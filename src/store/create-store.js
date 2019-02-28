import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // or whatever storage you are using

import { reducer as pwa } from './modules/pwa';
import { reducer as user } from './modules/user';

/**
 * Configure middleware
 */
const configureMiddleware =({ thunkExtraArguments }) => composeWithDevTools(
  applyMiddleware(
    thunk.withExtraArgument(thunkExtraArguments),
    createLogger(),
  ),
);

/**
 * Create Store
 */
export default (props, reducers = {})  => {
  // redux persist configuration with default storage (local storage)
  const persistConfig = {
    key : 'rvlt-exchange-round-2',
    storage,
  };

  // combine reducers
  const rootReducer = combineReducers({
    pwa,
    user,
    ...reducers,
  });

  // persist reducers
  const persistedReducer = persistReducer(persistConfig, rootReducer);

  // create store
  const store = createStore(
    persistedReducer,
    configureMiddleware(props),
  );

  // persist store
  let persistor = persistStore(store);
  // persistor.purge();

  // return store and redux persistor
  return { store, persistor };
};
