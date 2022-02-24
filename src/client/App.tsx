import React from 'react';
import { ErrorBoundary } from '@components';
import { Router } from '@router';
import { ThemeProvider } from '@context';

export const App = () => {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <Router />
      </ErrorBoundary>
    </ThemeProvider>
  );
};
