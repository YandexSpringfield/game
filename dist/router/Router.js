import React from 'react';
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';
import { Forum, GamePlay, GameStart, Leaderboard, Profile, Skeleton, } from '@containers';
import { ErrorPage, Login, Registration } from '@pages';
import { section, routes } from '@appConstants';
import { withAuth } from '@hoc-helpers';
const ProtectedRoutes = {
    Skeleton: withAuth(section.core)(Skeleton),
    Auth: withAuth(section.auth)(() => React.createElement(Outlet, null)),
};
export const Router = () => (React.createElement(BrowserRouter, null,
    React.createElement(Routes, null,
        React.createElement(Route, { element: React.createElement(ProtectedRoutes.Auth, null) },
            React.createElement(Route, { path: routes.login, element: React.createElement(Login, null) }),
            React.createElement(Route, { path: routes.registration, element: React.createElement(Registration, null) })),
        React.createElement(Route, { element: React.createElement(ProtectedRoutes.Skeleton, null) },
            React.createElement(Route, { path: routes.forum, element: React.createElement(Forum, null) }),
            React.createElement(Route, { path: routes.leaderboard, element: React.createElement(Leaderboard, null) }),
            React.createElement(Route, { path: routes.profile, element: React.createElement(Profile, null) }),
            React.createElement(Route, { path: routes.game.root },
                React.createElement(Route, { path: routes.game.start, element: React.createElement(GameStart, null) }),
                React.createElement(Route, { path: routes.game.play, element: React.createElement(GamePlay, null) }),
                React.createElement(Route, { element: React.createElement(GameStart, null), index: true }))),
        React.createElement(Route, { path: "*", element: React.createElement(ErrorPage, null) }))));
