import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Response } from 'express';
import { RootState } from '@store';
import { reducer } from '@store/reducer';
import { configureStore } from '@reduxjs/toolkit';
import { ServerRequest } from '@server/types';
import { initialState as initialStateUser } from '@store/user/userSlice';
import { initialState as initialStateLeaderbord } from '@store/leaderboard/leaderboardSlice';
import favicon from '@assets/images/favicon.ico';
import { App } from '@client/App';
import { IS_DEV } from '../../../webpack/env';

import '@client/styles/styles.module.scss';

function getHtml(reactHtml: string, preloadedState: RootState) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="${favicon}">
            ${!IS_DEV ? '<link rel="stylesheet" href="/css/styles.css">' : ''}
            <title>Springfield game</title>
        </head>
        <body>
            <div id="root" style="height: 100%">${reactHtml}</div>
            <script>
              window.__INITIAL_STATE__ = ${JSON.stringify(
                preloadedState,
              ).replace(/</g, '\\u003c')}
            </script>
            <script src="/js/main.js"></script>
        </body>
        </html>
    `;
}

export async function renderMiddleware(req: ServerRequest, res: Response) {
  const store = configureStore({
    reducer,
    preloadedState: {
      user: req.user || initialStateUser,
      leaderboard: req.leaderboard || initialStateLeaderbord,
    },
  });

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  let reactHTML = '';

  try {
    reactHTML = renderToString(jsx);
  } catch (err) {
    console.log(err);
  }
  res.status(200).send(getHtml(reactHTML, store.getState()));
}
