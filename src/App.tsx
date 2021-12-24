import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '@appConstants';
import { Login, Registration } from '@pages';

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.registration} element={<Registration />} />
      </Routes>
    </Router>
  );
};
