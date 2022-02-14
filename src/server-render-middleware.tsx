import React from 'react';
import { StaticRouter } from 'react-router-dom/server';
import { renderToString } from 'react-dom/server';
import { Request, Response } from 'express';
import favicon from '@/assets/images/favicon.ico';
import { App } from './App';

// <script>
//   // Записываем состояние редакса, сформированное на стороне сервера в window
//   // На стороне клиента применим это состояние при старте
//   window.__INITIAL_STATE__ = ${JSON.stringify(reduxState)}
// </script>

function getHtml(reactHtml: string) {
  return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="google-site-verification" content="nLL5VlSAgcKL756luG6o6UwKcvR8miU2duRnhU-agmE" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="shortcut icon" type="image/png" href="${favicon}">
            <title>Springfield game</title>
        </head>
        <body>
            <div id="root" style="height: 100%">${reactHtml}</div>
            <script src="/js/main.js"></script>
        </body>
        </html>
    `;
}

// В этой middleware мы формируем первичное состояние приложения на стороне сервера
// Попробуйте её подебажить, чтобы лучше разобраться, как она работает
// В этой middleware мы формируем первичное состояние приложения на стороне сервера
// Попробуйте её подебажить, чтобы лучше разобраться, как она работает
// eslint-disable-next-line react/function-component-definition
export default function (req: Request, res: Response) {
  // const context: StaticRouterContext = {};
  // const { store } = configureStore(getInitialState(location), location);

  const jsx = (
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const reactHtml = renderToString(jsx);
  res.status(200).send(getHtml(reactHtml));
}
