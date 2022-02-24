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
import { routes, Layout } from '@appConstants';
import { withAuth } from '@hoc-helpers';

const SectionRoutes = {
  Auth: withAuth(Layout.Auth)(() => <Outlet />),
  Skeleton: withAuth(Layout.Core)(Skeleton),
};

export const Router: FC = () => (
  <Routes>
    <Route element={<SectionRoutes.Auth />}>
      <Route path={routes.login} element={<Login />} />
      <Route path={routes.registration} element={<Registration />} />
    </Route>
    <Route element={<SectionRoutes.Skeleton />}>
      <Route path={routes.forum} element={<Forum />} />
      <Route path={routes.leaderboard} element={<Leaderboard />} />
      <Route path={routes.profile} element={<Profile />} />
      <Route path={routes.preview} element={<GameStart />} />
      <Route path={routes.game} element={<GamePlay />} />
    </Route>
    <Route path="*" element={<ErrorPage />} />
  </Routes>
);
