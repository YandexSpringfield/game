import express, { RequestHandler } from 'express';
import path from 'path';
import webpack from 'webpack';
import devMiddleware from 'webpack-dev-middleware';
import hotMiddleware from 'webpack-hot-middleware';
import serverRenderMiddleware from './server-render-middleware';
import clientConfig from '../webpack/client.config';

const app = express();

function getWebpackMiddlewares(
  config: webpack.Configuration,
): RequestHandler[] {
  const compiler = webpack({ ...config, mode: 'development' });

  return [
    devMiddleware(compiler, {
      publicPath: config.output?.publicPath,
    }),
    hotMiddleware(compiler, {
      path: '/__what',
    }),
  ];
}

app.use(express.static(path.resolve(__dirname, '../build')));
app.get('/*', [...getWebpackMiddlewares(clientConfig)], serverRenderMiddleware);

export { app };
