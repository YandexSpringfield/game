/* eslint-disable import/no-import-module-exports */
import * as React from 'react';
import { hydrate, render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '@store';
import { App } from './App';

import '@client/styles/styles.module.scss';

function startServiceWorker() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker
        .register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.warn('SW registration failed: ', registrationError);
        });
    });
  }
}

if (process.env.NODE_ENV === 'production') {
  startServiceWorker();
}

// @ts-ignore
const renderMethod = module.hot ? render : hydrate;

renderMethod(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

/**
 * For hot reloading development
 */
// @ts-ignore
if (import.meta.webpackHot) {
  // @ts-ignore
  import.meta.webpackHot.accept();
}
