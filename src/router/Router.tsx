import React, { FC } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import {
  Forum,
  GamePlay,
  GameStart,
  Leaderboard,
  Profile,
  Skeleton,
} from '@containers';
import { ErrorPage, Login, Registration } from '@pages';
import { section, routes } from '@appConstants';
import { withAuth } from '@hoc-helpers';

const ProtectedRoutes = {
  Skeleton: withAuth(section.core)(Skeleton),
  Auth: withAuth(section.auth)(() => <Outlet />),
};

export const Router: FC = () => (
  <Routes>
    <Route element={<ProtectedRoutes.Auth />}>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.registration} element={<Registration />} />
    </Route>
    <Route element={<ProtectedRoutes.Skeleton />}>
      <Route path={routes.forum} element={<Forum />} />
      <Route path={routes.leaderboard} element={<Leaderboard />} />
      <Route path={routes.profile} element={<Profile />} />
      <Route path={routes.game.root}>
        <Route path={routes.game.start} element={<GameStart />} />
        <Route path={routes.game.play} element={<GamePlay />} />
        <Route element={<GameStart />} index />
      </Route>
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
