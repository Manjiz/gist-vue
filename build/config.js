const env = process.env.NODE_ENV || 'development'

const publicPath = {
  development: '/',
  production: './',
}[env]

module.exports = {
  publicPath
}
