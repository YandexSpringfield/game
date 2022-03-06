/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import 'dotenv/config';
import webpack, { Configuration, Entry } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import { InjectManifest } from 'workbox-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { BUILD_DIR, SRC_DIR, IS_DEV } from './env';
import jsLoader from './loaders/js';
import cssLoader from './loaders/css';
import fileLoader from './loaders/file';

const plugins = [
  new webpack.HotModuleReplacementPlugin(),
  new MiniCssExtractPlugin({
    filename: 'css/styles.css',
  }),
];

if (!IS_DEV) {
  plugins.push(
    new InjectManifest({
      swSrc: path.join(__dirname, '../src/client/sw.js'),
      swDest: 'sw.js',
      maximumFileSizeToCacheInBytes: 40000000,
      compileSrc: !IS_DEV,
    }),
  );
}

const config: Configuration = {
  mode: (process.env.NODE_ENV as 'production' | 'development') || 'development',
  name: 'client',
  target: 'web',
  plugins,
  entry: [
    IS_DEV &&
      'webpack-hot-middleware/client?path=/__what&reload=true&quiet=true',
    path.join(SRC_DIR, 'client'),
  ].filter(Boolean) as unknown as Entry,
  module: {
    rules: [...fileLoader, ...cssLoader.client, jsLoader],
  },
  output: {
    path: BUILD_DIR,
    filename: 'js/[name].js',
    clean: IS_DEV,
    publicPath: '/',
    assetModuleFilename: 'static/[hash][ext][query]',
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
  devtool: IS_DEV ? 'source-map' : false,
};

export default config;
