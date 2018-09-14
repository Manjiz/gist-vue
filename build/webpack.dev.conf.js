const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const base = require('./webpack.base.conf')

module.exports = merge(base, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: path.join(__dirname, '..', 'dist'),
    hot: true
  }
})
