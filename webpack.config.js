const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const Dotenv = require('dotenv-webpack');

function dirname() {
  return path.resolve();
}

const src = path.resolve(dirname(), 'src');
const dist = path.resolve(dirname(), 'dist');

module.exports = (env, argv) => {
  const IS_PRODUCTION = argv.mode === 'production';

  const config = {
    entry: './src/index.js',
    output: {
      path: dist,
      filename: '[name].[contenthash].js',
      publicPath: '/',
    },

    resolve: {
      alias: {
        '@': src,
      },
    },
    mode: argv.mode,
    devServer: {
      static: dist,
      historyApiFallback: {
        rewrites: [
          { from: /^\/$/, to: path.join(dist, '/index.html') },
        ],
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(src, '/index.html'),
      }),
      new VueLoaderPlugin(),
      new CleanWebpackPlugin(),
      new webpack.DefinePlugin({
        __VUE_OPTIONS_API__: IS_PRODUCTION ? false : true,
        __VUE_PROD_DEVTOOLS__: IS_PRODUCTION ? false : true,
      }),
      new Dotenv()
    ],
    module: {
      rules: [
        {
          test: /\.vue$/,
          loader: 'vue-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.scss$/,
          use: [
            IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            IS_PRODUCTION ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: '[local]--[hash:base64:6]',
                },
              },
            },
          ],
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
          },
        },
      ],
    },
    optimization: {
      minimizer: [new CssMinimizerPlugin()],
      splitChunks: {
        cacheGroups: {
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: 'node_modules',
            chunks: 'all',
          },
        },
      },
    },
  };

  if (IS_PRODUCTION) {
    // put all CSS files to a single <link rel="stylesheet" href="...">
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: '[contenthash].css',
      })
    );
  } else {
    // config.devtool = "inline-source-map";
  }

  return config;
};
