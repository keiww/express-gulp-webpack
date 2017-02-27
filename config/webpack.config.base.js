const webpack = require('webpack')
const path = require('path')
const glob = require('glob')

const root = path.resolve(__dirname, '../')

module.exports = {
  entry: getEntries(),
  output: {
    path: path.resolve(root, 'public/js'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      jQuery: "jquery",
      $: "jquery",
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // this assumes your vendor imports exist in the node_modules directory
        return module.context && module.context.indexOf('node_modules') !== -1
      }
    })
  ]
}

function getEntries () {
  let files = glob.sync(path.resolve(root, 'client/js/*.js'))
  let entries = {} 
  files.forEach((file) => {
    let filepath = './' + path.relative(root, file)
    let filename = filepath.split('/').pop()
    filename = filename.substr(0, filename.lastIndexOf('.'))
    entries[filename] = filepath
  })
  return entries
}
