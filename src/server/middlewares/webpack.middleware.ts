import webpack from 'webpack';
import { RequestHandler } from 'express';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import { IS_DEV } from '../../../webpack/env';

export function webpackClientMiddleware(
  config: webpack.Configuration,
): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });

  if (IS_DEV) {
    return [
      devMiddleware(compiler, {
        publicPath: config.output?.publicPath,
        serverSideRender: true,
      }),
      hotMiddleware(compiler, {
        path: '/__what',
        log: false,
      }),
    ];
  }

  return [];
}
