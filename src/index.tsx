import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

import 'styles/styles.module.scss';

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

startServiceWorker();

ReactDOM.render(<App />, document.getElementById('root'));
