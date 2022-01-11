import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Game } from '@pages';
import { Header, Forum, Leaderboard, Profile } from '@containers';
import { routes } from '@appConstants';

export const Skeleton: FC<{}> = () => (
  <>
    <Header />
    <Routes>
      <Route path={routes.forum} element={<Forum />} />
      <Route path={routes.leaderboard} element={<Leaderboard />} />
      <Route path={routes.profile} element={<Profile />} />
      <Route path={routes.game} element={<Game />} />
    </Routes>
  </>
);
