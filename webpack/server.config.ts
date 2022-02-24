/* eslint-disable import/no-extraneous-dependencies */
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import { Configuration } from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { IS_DEV, BUILD_DIR, SRC_DIR } from './env';
import fileLoader from './loaders/file';
import cssLoader from './loaders/css';
import jsLoader from './loaders/js';

const config: Configuration = {
  mode: process.env.NODE_ENV as 'production' | 'development',
  name: 'server',
  dependencies: ['client'],
  target: 'node',
  node: { __dirname: false },
  entry: {
    server: path.join(SRC_DIR, 'server/server.ts'),
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css',
    }),
  ],
  optimization: {
    nodeEnv: false,
  },
  module: {
    rules: [...fileLoader, ...cssLoader, jsLoader],
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    clean: IS_DEV,
    publicPath: '/',
    assetModuleFilename: 'static/[hash][ext][query]',
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.json', '.ts', '.tsx'],
    plugins: [new TsconfigPathsPlugin({ configFile: './tsconfig.json' })],
  },
  performance: {
    hints: IS_DEV ? false : 'warning',
  },
  externals: [nodeExternals({ allowlist: [/\.(?!(?:tsx?|json)$).{1,5}$/i] })],
};

export default config;
