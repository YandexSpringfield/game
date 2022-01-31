// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import { css } from '../loaders';

interface Options {
  isSSR: boolean;
} /* eslint-disable @typescript-eslint/no-unused-vars */
export default (_options: Options) => (webpackConfig) => {
  webpackConfig.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
    }),
  );

  webpackConfig.module.rules.push(...css.client);

  return webpackConfig;
};
