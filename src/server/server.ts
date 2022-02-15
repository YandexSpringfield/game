/* eslint-disable import/no-extraneous-dependencies */
import express, { RequestHandler } from 'express';
import path from 'path';
import { readFileSync } from 'fs';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import cookieParser from 'cookie-parser';
import https from 'https';
import clientConfig from '../../webpack/client.config';
import { IS_DEV } from '../../webpack/env';
import { authMiddleware, serverRenderMiddleware } from '.';

const app = express();
const port = process.env.PORT || 9001;

function getWebpackMiddlewares(
  config: webpack.Configuration,
): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });

  if (IS_DEV) {
    return [
      devMiddleware(compiler, {
        publicPath: config.output?.publicPath,
      }),
      hotMiddleware(compiler, {
        path: '/__what',
        log: false,
      }),
    ];
  }

  return [];
}

app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.use(authMiddleware);
app.get('/*', [...getWebpackMiddlewares(clientConfig)], serverRenderMiddleware);

const startApp = () => {
  if (IS_DEV) {
    const pem = readFileSync(
      path.resolve(__dirname, '../certificates/cert.pem'),
      'utf-8',
    );

    const key = readFileSync(
      path.resolve(__dirname, '../certificates/key.pem'),
      'utf-8',
    );

    const server = https.createServer(
      {
        key,
        cert: pem,
      },
      app,
    );
    server.listen(port, () => {
      console.log('Application is started on localhost:', port);
    });
  } else {
    app.listen(port, () => {
      console.log('Application is started on localhost:', port);
    });
  }
};

startApp();
