import path from 'path';
import { merge } from 'webpack-merge';
import 'webpack-dev-server';
import type { Configuration } from 'webpack';
import commonConfig from './webpack.config.common';

const config: Configuration = merge(commonConfig, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    port: 8000,
    static: {
      directory: path.join(__dirname, 'public'),
    },
    hot: true,
    liveReload: true,
  },
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[local]',
              },
            },
          },
          'postcss-loader',
        ],
      },
    ],
  },
});

export default config;
