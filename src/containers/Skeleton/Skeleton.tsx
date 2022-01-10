import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Forum, Leaderboard, Profile } from '@containers';
import { routes } from '@appConstants';

export const Skeleton: FC<{}> = () => (
  <>
    <Header />
    <Routes>
      <Route path={routes.forum} element={<Forum />} />
      <Route path={routes.leaderboard} element={<Leaderboard />} />
      <Route path={routes.profile} element={<Profile />} />
    </Routes>
  </>
);
