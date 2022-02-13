import React from 'react';
import { ErrorBoundary } from '@components';
import { Router } from '@router';

export const App = () => {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};
