import React from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@components';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { Router } from '@router';

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Provider>
    </ErrorBoundary>
  );
};
