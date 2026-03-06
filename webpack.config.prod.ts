import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import { mergeWithRules, CustomizeRule } from 'webpack-merge';
import type { Configuration } from 'webpack';
import commonConfig from './webpack.config.common.ts';

const merge = mergeWithRules({
  module: {
    rules: {
      test: CustomizeRule.Match,
      generator: CustomizeRule.Replace,
      type: CustomizeRule.Replace,
    },
  },
});

const config: Configuration = merge(commonConfig, {
  mode: 'production',
  output: {
    filename: 'scripts/[name].[contenthash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(jpe?g|png|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name].[contenthash][ext]',
        },
      },
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader,
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
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
  ],
});

export default config;
