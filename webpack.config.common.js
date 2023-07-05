const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const RobotstxtPlugin = require("robotstxt-webpack-plugin");
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

module.exports = {
  target: 'web',
  entry: './src/index.js',
  output: {
    filename: '[name].[contenthash].js',
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
        type: 'asset/resource'
      },
      {
        test: /\.svg/i,
        type: 'asset/inline'
      },
      {
        test: /\.(eot|otf|ttf|woff|woff2)$/i,
        generator: {
          filename: '[name][ext][query]'
        }
      }
    ],
  },
  optimization: {
    minimizer: [
      "...",
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["gifsicle", { interlaced: true }],
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 5 }],
              [
                "svgo",
                {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                          addAttributesToSVGElement: {
                            params: {
                              attributes: [
                                {xmlns: "http://www.w3.org/2000/svg"},
                              ],
                            },
                          },
                        },
                      },
                    },
                  ],
                },
              ],
            ],
          }
        }
      }),
    ],
    splitChunks: {
      chunks: "all",
    },
  },
  resolve: {
    extensions: ['.js', '.json'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new RobotstxtPlugin({}), // Options: https://github.com/itgalaxy/generate-robotstxt
    new WebpackManifestPlugin({}) // Options: https://github.com/shellscape/webpack-manifest-plugin#options
  ]
}
