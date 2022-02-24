import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@containers';

export const Skeleton = () => (
  <>
    <Header />
    <Outlet />
  </>
);
