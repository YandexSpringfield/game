import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '@containers';
export const Skeleton = () => (React.createElement(React.Fragment, null,
    React.createElement(Header, null),
    React.createElement(Outlet, null)));
