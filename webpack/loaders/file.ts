export default {
  client: [
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.(png|jpg)$/i,
      type: 'asset/resource',
    },
  ],
  server: [
    {
      test: /\.svg$/,
      use: 'null-loader',
    },
    {
      test: /\.(png|jpg)$/i,
      type: 'null-loader',
    },
  ],
};
