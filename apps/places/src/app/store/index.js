import {
    applyMiddleware, combineReducers, compose, createStore,
  } from 'redux';
  import thunk from 'redux-thunk';
  import { persistStore, persistReducer } from 'redux-persist';
  import storage from './storage';
  
  /* reducers */
  /* please import in alphabetical order */
  import places from './reducers/places';
  
  const middleware = [thunk];
  
  
  const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    })
    : compose;
  
  const enhancer = composeEnhancers(
    applyMiddleware(...middleware),
    // other store enhancers if any
  );
  
  
  const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
      'places',
    ],
    version: 2,
  };

  
  const rootReducer = combineReducers({
    places,
  });
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = createStore(persistedReducer, enhancer);
  export const persistor = persistStore(store);
  