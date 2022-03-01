import React, { useEffect } from 'react';
import { ErrorBoundary } from '@components';
import { Router } from '@router';
import { useUserThemeSelector } from '@store/user/userSelector';
import { Theme } from '@types';

export const App = () => {
  const theme = useUserThemeSelector();

  useEffect(() => {
    document.body.setAttribute('data-theme', theme || Theme.Light);
  }, [theme]);

  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
};
