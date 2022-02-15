import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { Request, Response } from 'express';
import { RootState } from '@store';
import { reducer } from '@store/reducer';
import { configureStore } from '@reduxjs/toolkit';
import favicon from '@/assets/images/favicon.ico';
import { App } from './App';
import {leaderboardAPI} from '@api';
import {instanceAxios} from '@api/axios';
import {PATH_API} from '@api/config';

// <script>
//   // Записываем состояние редакса, сформированное на стороне сервера в window
//   // На стороне клиента применим это состояние при старте
//   window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
// </script>

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
            <link rel="stylesheet" href="/static/styles.css">
            <title>Springfield game</title>
        </head>
        <body>
            <div id="root" style="height: 100%">${reactHtml}</div>
            <script>
              window.__PRELOADED_STATE__ = ${JSON.stringify(
                preloadedState,
              ).replace(/</g, '\\u003c')}
            </script>
            <script src="/js/main.js"></script>
        </body>
        </html>
    `;
}

export default async function serverRenderMiddleware(
  req: Request,
  res: Response,
) {
  /**
   * Пытаюсь получить куки (установил cookie-parser)
   * Но объект пустой
   */
  console.log(req.cookies);

  // const leaderbord = await instanceAxios({
  //   method: 'get',
  //   url: PATH_API.LEADERBOARD.GET_ALL_USERS,
  //   headers: {
  //     Cookie: `io=${req.cookies?.io}`,
  //   },
  //   // headers: req.headers,
  // });
  // console.log(leaderbord);

  const store = configureStore({ reducer });

  const jsx = (
    <Provider store={store}>
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const reactHtml = renderToString(jsx);
  res.status(200).send(getHtml(reactHtml, store.getState()));
}
