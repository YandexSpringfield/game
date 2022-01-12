import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from '@appConstants';
import { Login, Registration } from '@pages';
import {
  Forum,
  Leaderboard,
  Profile,
  Skeleton,
  GameStart,
  GamePlay,
} from '@containers';
import { ErrorBoundary } from '@components';
import { store } from '@store';

export const App = () => {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.registration} element={<Registration />} />
            <Route element={<Skeleton />}>
              <Route path={routes.forum} element={<Forum />} />
              <Route path={routes.leaderboard} element={<Leaderboard />} />
              <Route path={routes.profile} element={<Profile />} />
              <Route path={routes.game.root}>
                <Route path={routes.game.start} element={<GameStart />} />
                <Route path={routes.game.play} element={<GamePlay />} />
                <Route element={<GameStart />} index />
              </Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </ErrorBoundary>
  );
};
