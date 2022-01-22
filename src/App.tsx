import React from 'react';
import { Provider } from 'react-redux';
import { ErrorBoundary } from '@components';
import { store } from '@store';
import { Router } from '@router';

export const App = () => {
  return (
    <ErrorBoundary>
      <h1>Test deploy</h1>
      <Provider store={store}>
        <Router />
      </Provider>
    </ErrorBoundary>
  );
};
