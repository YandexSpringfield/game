import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '@appConstants';
import { Login, Registration } from '@pages';
import { Skeleton } from '@containers';
import { store } from '@store';

export const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path={routes.login} element={<Login />} />
          <Route path={routes.registration} element={<Registration />} />
        </Routes>
        <Skeleton />
      </Router>
    </Provider>
  );
};
