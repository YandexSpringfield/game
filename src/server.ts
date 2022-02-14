/* eslint-disable import/no-extraneous-dependencies */
import express, { RequestHandler } from 'express';
import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import serverRenderMiddleware from './server-render-middleware';
import clientConfig from '../webpack/client.config';
import { IS_DEV } from '../webpack/env';

const app = express();

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

app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('/*', [...getWebpackMiddlewares(clientConfig)], serverRenderMiddleware);

export { app };
