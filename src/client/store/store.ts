import { configureStore } from '@reduxjs/toolkit';
import thunkMiddleware from 'redux-thunk';
import { reducer } from '@store/reducer';

export const isServer = !(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

declare global {
  interface Window {
    // @ts-ignore
    __INITIAL_STATE__: ReturnType<typeof store.getState> | undefined;
  }
}

export const store = configureStore({
  preloadedState: isServer ? undefined : window.__INITIAL_STATE__,
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunkMiddleware),
});

// delete window.__INITIAL_STATE__;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
