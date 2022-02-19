import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loading } from '@components';
import { routes, section } from '@appConstants';
import { authAPI } from '@api';

export const withAuth = (pathname: string) => {
  return (WrappedComponent) =>
    // eslint-disable-next-line func-names
    function () {
      const [authed, setAuthed] = useState(false);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
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
            <Navigate to={routes.preview} />
          ) : null}
        </>
      );
    };
};
