export default {
  client: {
    test: /\.(jsx?|tsx?)$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
  server: {
    test: /\.(jsx?|tsx?)$/,
    use: 'babel-loader',
    exclude: /node_modules/,
  },
};
