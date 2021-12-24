import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, Forum } from '@containers';
import { routes } from '@appConstants';

export const Skeleton: FC<{}> = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.forum} element={<Forum />} />
      </Routes>
    </>
  );
};
