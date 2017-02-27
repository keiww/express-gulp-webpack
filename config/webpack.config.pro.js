const merge = require('webpack-merge')
const webpack = require('webpack')
const baseConfig = require('./webpack.config.base.js')

const config = merge(baseConfig, {
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true})
  ]
})

module.exports = config