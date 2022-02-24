export default [
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
  {
    test: /\.(png|jpg|ico)$/i,
    type: 'asset/resource',
  },
];
