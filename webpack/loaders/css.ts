// eslint-disable-next-line import/no-extraneous-dependencies
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { IS_DEV } from '../env';

export default {
  server: [
    {
      test: /\.s[ac]ss$/i,
      exclude: /\.module.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            },
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.module.s[ac]ss$/i,
      use: [
        {
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[folder]__[hash:base64:5]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            },
          },
        },
        'sass-loader',
      ],
    },
  ],
  client: [
    {
      test: /\.s[ac]ss$/i,
      exclude: /\.module.s[ac]ss$/i,
      use: [
        IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            },
          },
        },
        'sass-loader',
      ],
    },
    {
      test: /\.module.s[ac]ss$/i,
      use: [
        IS_DEV ? 'style-loader' : MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[folder]__[hash:base64:5]',
            },
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            postcssOptions: {
              plugins: ['postcss-preset-env'],
            },
          },
        },
        'sass-loader',
      ],
    },
  ],
};
