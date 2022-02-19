export default {
  client: [
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.(png|jpg|ico)$/i,
      type: 'asset/resource',
    },
  ],
  server: [
    {
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    },
    {
      test: /\.(png|jpg|ico)$/i,
      type: 'asset/resource',
    },
  ],
};
