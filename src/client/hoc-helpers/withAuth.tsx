import React, { useEffect } from 'react';
import { routes, Layout } from '@appConstants';
import { Navigate } from 'react-router-dom';
import { useUserSelector } from '@store';
import { parseNumbers } from '@utils/utils';
import { useAuth } from '@hooks';

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
        return <Navigate to={routes.login} />;
      }

      if (!id && layout === Layout.Auth) {
        return <WrappedComponent />;
      }

      if (id && layout === Layout.Auth) {
        return <Navigate to={routes.preview} />;
      }

      return null;
    };
};
