// // import express, { Request, Response } from 'express';
// // import React from 'react';
// // import { renderToString } from 'react-dom/server';

// // const React = require('react');
// const { renderToString } = require('react-dom/server');

// function makeHTMLPage(content) {
//   return `
//         <!DOCTYPE html>
//         <html lang="en">
//         <head>
//         <meta charset="UTF-8">
//         <meta name="viewport" content="width=device-width, initial-scale=1.0">
//         <meta http-equiv="X-UA-Compatible" content="ie=edge">
//         <title>From SSR with Love</title>
//         </head>
//         <body>
//         <div id="root">${content}</div>
//         </body>
//         </html>
//         `;
// }
// // <div id="root">${htmlescape(content)}</div>
// const mySuperApp = '<div>Контент приложения теперь в JSX</div>';

// const express = require('express');
// const path = require('path');

// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// // app.get('*', (req, res) => {
// //   res.sendFile(path.join(__dirname, 'build/index.html'));
// // });

// app.get('/', (req, res) => {
//   const appContentHTML = renderToString(mySuperApp);
//   res.send(makeHTMLPage(appContentHTML));
// });

// export function appRoutes(router) {
//   router.get('/', middlewares, renderApp);
// }

// const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}!`);
// });

import server from './app';
import { startApp } from './utils/startApp';

startApp({ server });
