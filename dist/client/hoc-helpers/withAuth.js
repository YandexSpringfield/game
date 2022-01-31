import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Loading } from '@components';
import { routes, section } from '@appConstants';
import { authAPI } from '@api';
export const withAuth = (pathname) => {
    return (WrappedComponent) => function () {
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
        return (React.createElement(React.Fragment, null,
            loading ? React.createElement(Loading, null) : null,
            authed && !loading && pathname === section.core ? (React.createElement(WrappedComponent, null)) : null,
            !authed && !loading && pathname === section.core ? (React.createElement(Navigate, { to: routes.login })) : null,
            !authed && !loading && pathname === section.auth ? (React.createElement(WrappedComponent, null)) : null,
            authed && !loading && pathname === section.auth ? (React.createElement(Navigate, { to: routes.game.root })) : null));
    };
};
