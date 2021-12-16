import React from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import { routes } from '@appConstants';
import { Login, Registration } from '@pages';

export const App = () => {
  return (
    <Router>
      <nav>
        <Link to={routes.login}>Login page</Link>
        <Link to={routes.registration}>Registration page</Link>
      </nav>
      <Routes>
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.registration} element={<Registration />} />
      </Routes>
    </Router>
  );
};
