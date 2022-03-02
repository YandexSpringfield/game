export default [
  {
    test: /\.svg$/,
    use: ['@svgr/webpack'],
  },
  {
    test: /\.(png|jpg|ico)$/i,
    type: 'asset/resource',
  },
  {
    test: /\.(ogg|mp3|wav|mpe?g)$/i,
    loader: 'file-loader',
  },
];
