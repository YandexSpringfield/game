/* eslint-disable import/no-extraneous-dependencies */
import webpack from 'webpack';
import { RequestHandler } from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { IS_DEV } from '../../../webpack/env';

export function webpackMiddleware(
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
