const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');

module.exports = {
  target: 'web',
  entry: './src/scripts/index.js',
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    assetModuleFilename: '[name][ext][query]'
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.js$/i,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name][ext][query]'
        }
      },
      {
        test: /\.svg/i,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        generator: {
          filename: 'fonts/[name][ext][query]'
        }
      }
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html'),
      inject: 'body',
      scriptLoading: 'defer'
    }),
    new RobotstxtPlugin({}), // Options: https://github.com/itgalaxy/generate-robotstxt
    new WebpackManifestPlugin({}) // Options: https://github.com/shellscape/webpack-manifest-plugin#options
  ]
}
