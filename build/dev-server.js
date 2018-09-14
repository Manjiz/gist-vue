const express = require('express')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const DashboardPlugin = require('webpack-dashboard/plugin')
const conf = require('./webpack.dev.conf')

const app = express()

const port = process.env.PORT || 8080

conf.entry.app = ['webpack-hot-middleware/client', conf.entry.app]

const compiler = webpack(conf)
compiler.apply(new DashboardPlugin())
app.use(webpackDevMiddleware(compiler, {
  publicPath: conf.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleware(compiler))

app.listen(port, () => {
  console.log(`server started at localhost:${port}`)
})
