export default {
  client: [
    {
      test: /\.s[ac]ss$/i,
      exclude: /\.module.s[ac]ss$/i,
      use: [
        {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
          },
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
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
          },
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
  server: {
    test: /\.css$/,
    loader: 'null-loader',
  },
};
