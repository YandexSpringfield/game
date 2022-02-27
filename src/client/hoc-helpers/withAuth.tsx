import React, { useEffect } from 'react';
import { routes, Layout } from '@appConstants';
import { useUserSelector } from '@store';
import { parseNumbers } from '@utils/utils';
import { useAuth } from '@hooks';
import { Login } from '@pages';
import { GameStart } from '@containers';

export const withAuth = (layout: Layout) => {
  return (WrappedComponent) =>
    function render() {
      const { yaSingIn } = useAuth();
      const { id } = useUserSelector();

      useEffect(() => {
        const { code } = parseNumbers(window.location.search);
        if (code) {
          yaSingIn(code, routes.preview);
        }
      }, []);

      if (id && layout === Layout.Core) {
        return <WrappedComponent />;
      }

      if (!id && layout === Layout.Core) {
        return <Login />;
      }

      if (!id && layout === Layout.Auth) {
        return <WrappedComponent />;
      }

      if (id && layout === Layout.Auth) {
        return <GameStart />;
      }

      return null;
    };
};
