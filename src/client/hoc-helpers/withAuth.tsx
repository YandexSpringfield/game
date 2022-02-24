import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loading } from '@components';
import { routes, section } from '@appConstants';
import { useAuth } from '@hooks';
import { parseNumbers } from 'src/client/utils/utils';
import { authAPI } from '../../api';

export const withAuth = (pathname: string) => {
  return (WrappedComponent) =>
    // eslint-disable-next-line func-names
    function () {
      const [authed, setAuthed] = useState(false);
      const [loading, setLoading] = useState(true);
      const { yaSingIn } = useAuth();

      useEffect(() => {
        const { code } = parseNumbers(window.location.search);

        authAPI
          .getUserInfo()
          .then(() => {
            setAuthed(true);
            setLoading(false);
          })
          .catch(() => {
            setAuthed(false);
            setLoading(false);
          });

        if (code) {
          yaSingIn(code, routes.game.root);
        }
      }, []);

      return (
        <>
          {loading ? <Loading /> : null}
          {authed && !loading && pathname === section.core ? (
            <WrappedComponent />
          ) : null}
          {!authed && !loading && pathname === section.core ? (
            <Navigate to={routes.login} />
          ) : null}
          {!authed && !loading && pathname === section.auth ? (
            <WrappedComponent />
          ) : null}
          {authed && !loading && pathname === section.auth ? (
            <Navigate to={routes.game.root} />
          ) : null}
        </>
      );
    };
};
