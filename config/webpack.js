/* eslint-disable import/first, import/no-extraneous-dependencies */
process.noDeprecation = true
require('dotenv').config({silent: true})

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const loaders = require('./webpack.loaders')

const resolve = (dir) => path.join(__dirname, '..', dir)

const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: true,
    modules: true,
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
  },
}

const createStyleLoader = (styleLoaders) => {
  const defaultLoaders = [MiniCssExtractPlugin.loader]

  if (Array.isArray(loaders)) {
    return defaultLoaders.concat(styleLoaders)
  }
  if (typeof loaders === 'object' || typeof loaders === 'string') {
    return defaultLoaders.concat([styleLoaders])
  }
  if (loaders == null) {
    return defaultLoaders
  }

  throw new Error('Invalid style loader')
}

loaders.push(
  {
    test: /\.css$/,
    oneOf: [
      {
        use: createStyleLoader([cssLoader]),
        exclude: /node_modules/,
      },
      {
        use: createStyleLoader('css-loader'),
        include: /node_modules/,
      },
    ],
  },
  {
    test: /\.less$/,
    use: createStyleLoader([
      'css-loader',
      {
        loader: 'less-loader',
      },
    ]),
    include: /antd/,
  },
)

module.exports = {
  entry: ['babel-polyfill', './src/client/index.js'],
  devtool: false,
  output: {
    publicPath: '/assets/',
    path: resolve('./dist/'),
    filename: 'bundle.[hash].js',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
  },
  module: {
    rules: loaders,
  },
  optimization: {
    // Disabling minification so we can see what's going on in the bundle
    minimize: false,
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new MiniCssExtractPlugin({
      filename: 'style.[chunkhash].css',
    }),
    new HtmlWebpackPlugin({
      filename: resolve('./public/index.html'),
      inject: true,
      environment: process.env.NODE_ENV,
      template: resolve('./src/client/template.html'),
      chunksSortMode: 'dependency',
      minify: {
        removeComments: false,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: false,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  ],
  target: 'web',
}
