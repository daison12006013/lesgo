const path = require('path');
// eslint-disable-next-line import/no-unresolved
const slsw = require('serverless-webpack');
const webpack = require('webpack');

module.exports = {
  entry: slsw.lib.entries,
  output: {
    libraryTarget: 'commonjs',
    filename: '[name].js',
    path: path.join(__dirname, '.webpack'),
  },
  devtool: 'cheap-module-source-map',
  mode: process.env.APP_ENV === 'local' ? 'development' : 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.js$/, // include .js files
        enforce: 'pre', // preload the jshint loader
        exclude: /node_modules/, // exclude any and all files in the node_modules folder
        include: __dirname,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
    ],
  },
  externals: [{ 'aws-sdk': 'commonjs aws-sdk' }],
  resolve: {
    alias: {
      Middlewares: path.resolve(__dirname, 'src/middlewares/'),
      Exceptions: path.resolve(__dirname, 'src/exceptions/'),
      Services: path.resolve(__dirname, 'src/services/'),
      Constants: path.resolve(__dirname, 'src/constants/'),
      Core: path.resolve(__dirname, 'src/core/'),
      Utils: path.resolve(__dirname, 'src/utils/'),
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.SENTRY_BUNDLED': process.env.SENTRY_ENABLED,
    }),
  ],
};
