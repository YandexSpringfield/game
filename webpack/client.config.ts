/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import webpack, { Configuration as WebpackConfiguration, Entry } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';

import { BUILD_DIR, SRC_DIR, IS_DEV } from './env';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import fileLoader from './loaders/file';

const plugins = [new webpack.HotModuleReplacementPlugin()];

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

if (!IS_DEV) {
  plugins.push(
    new InjectManifest({
      swSrc: path.join(__dirname, './src/sw.js'),
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: 40000000,
      compileSrc: !IS_DEV,
    }),
  );
}

const config: Configuration = {
  target: 'web',
  plugins,
  entry: [
    // IS_DEV && 'react-hot-loader/patch',
    // // Entry для работы HMR
    IS_DEV &&
      'webpack-hot-middleware/client?path=http://localhost:9001/__what&reload=true',
    // IS_DEV && 'css-hot-loader/hotModuleReplacement',
    path.join(SRC_DIR, 'client'),
  ].filter(Boolean) as unknown as Entry,
  module: {
    rules: [...fileLoader.client, ...cssLoader.client, jsLoader.client],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    fallback: {
      fs: false,
    },
    plugins: [
      new TsconfigPathsPlugin({
        configFile: './tsconfig.paths.json',
      }),
    ],
  },
  devtool: 'source-map',
};

export default config;
