import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes, Layout } from '@appConstants';
import { useUserSelector } from '@store';

export const withAuth = (layout: Layout) => {
  return (WrappedComponent) =>
    function render() {
      const { id } = useUserSelector();

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
