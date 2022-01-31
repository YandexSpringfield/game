// const path = require('path');
// const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { InjectManifest } = require('workbox-webpack-plugin');

// module.exports = (env, options) => {
//   const plugins = [
//     new HtmlWebpackPlugin({
//       template: './public/index.html',
//       favicon: './public/favicon.ico',
//       inject: 'body',
//     }),
//   ];

//   if (options.mode === 'production') {
//     plugins.push(
//       new InjectManifest({
//         swSrc: './src/sw.js',
//         swDest: 'sw.js',
//         maximumFileSizeToCacheInBytes: 40000000,
//         compileSrc: options.mode === 'production',
//       }),
//     );
//   }

//   return {
//     // entry: './src/index.tsx',
//     entry: ['react-hot-loader/patch', './src/index.tsx'],
//     output: {
//       publicPath: '/',
//       path: path.resolve(__dirname, 'build'),
//       filename: 'bundle-[fullhash].js',
//     },
//     module: {
//       rules: [
//         {
//           test: /\.(jsx?|tsx?)$/,
//           use: 'babel-loader',
//           exclude: /node_modules/,
//         },
//         {
//           test: /\.s[ac]ss$/i,
//           exclude: /\.module.s[ac]ss$/i,
//           use: [
//             {
//               loader: 'style-loader',
//               options: {
//                 injectType: 'singletonStyleTag',
//               },
//             },
//             'css-loader',
//             {
//               loader: 'postcss-loader',
//               options: {
//                 postcssOptions: {
//                   plugins: ['postcss-preset-env'],
//                 },
//               },
//             },
//             'sass-loader',
//           ],
//         },
//         {
//           test: /\.module.s[ac]ss$/i,
//           use: [
//             {
//               loader: 'style-loader',
//               options: {
//                 injectType: 'singletonStyleTag',
//               },
//             },
//             {
//               loader: 'css-loader',
//               options: {
//                 modules: {
//                   localIdentName: '[folder]__[hash:base64:5]',
//                 },
//               },
//             },
//             {
//               loader: 'postcss-loader',
//               options: {
//                 postcssOptions: {
//                   plugins: ['postcss-preset-env'],
//                 },
//               },
//             },
//             'sass-loader',
//           ],
//         },
//         {
//           test: /\.svg$/,
//           use: ['@svgr/webpack'],
//         },
//         {
//           test: /\.(png|jpg)$/i,
//           type: 'asset/resource',
//         },
//       ],
//     },
//     resolve: {
//       extensions: ['.ts', '.tsx', '.js', '.jsx'],
//       fallback: {
//         fs: false,
//       },
//       plugins: [
//         new TsconfigPathsPlugin({
//           configFile: './tsconfig.paths.json',
//         }),
//       ],
//     },
//     devServer: {
//       historyApiFallback: true,
//     },
//     plugins,
//   };
// };
