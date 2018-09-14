const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const autoprefixer = require('autoprefixer')
const { VueLoaderPlugin } = require('vue-loader')
const config = require('./config')
const devMode = process.env.NODE_ENV !== 'production'

function resolve (dir) {
  if (typeof(dir) === 'string') {
    dir = [dir]
  }
  if (dir instanceof Array) {
    dir.unshift(__dirname, '..')
  } else {
    dir = [__dirname, '..']
  }
  return path.join(...dir)
}

const sassLoader = {
  loader: 'sass-loader',
  options: {
    includePaths: [resolve(['src', 'sass'])]
  }
}
const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: (loader) => [
      autoprefixer({
        browsers: ['last 10 versions']
      })
    ]
  }
}
const cssLoader = {
  loader: 'css-loader',
  options: {
    minimize: process.env.NODE_ENV === 'production'
  }
}

module.exports = {
  context: resolve(),
  devtool: '#source-map',
  entry: {
    app: './src/app.js',
    vendor: ['vue', 'vue-resource', 'vue-router', 'vuex']
  },
  output: {
    path: resolve('dist'),
    publicPath: config.publicPath,
    filename: '[name].js',
    chunkFilename: '[name].[hash].js'
  },
  resolve: {
    alias: {
      '@': resolve('src'),
      '@c': resolve(['src', 'components']),
      '@img': resolve(['src', 'images'])
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [autoprefixer({browsers: ['last 10 versions']})],
          loaders: {
            js: ['babel-loader', 'eslint-loader'],
            sass: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              cssLoader,
              sassLoader
            ]
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          cssLoader,
          'resolve-url-loader',
          postcssLoader, sassLoader
        ]
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 1000,
          name: 'images/[name].[ext]'
        }
      },
      // {
      //   test: /\.css$/,
      //   use: ['style-loader', cssLoader]
      // }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
