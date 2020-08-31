import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

import { persistStore, persistReducer } from 'redux-persist';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth']
};

const persistedReducer = persistReducer(persistConfig, reducers);

let store;

function initStore(initialState) {
  const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
  );

  return store;
}

export const initializeStore = preloadedState => {
  let _store = store || initStore(preloadedState);

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = initStore({ ...store.getState(), ...preloadedState });
    // Reset the current store
    store = undefined;
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store;
  // Create the store once in the client
  if (!store) store = _store;

  return _store;
};

export function configureStore(initialState = {}) {
  /* eslint-disable */
  // const store = useMemo(() => initializeStore(initialState), [initialState]);
  const store = initializeStore(initialState, [initialState]);
  const persistor = persistStore(store);

  return { store, persistor };
}
