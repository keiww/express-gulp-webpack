var fs = require('fs')
var config = require('config')
var urljoin = require('url-join')

let manifest
let options = {
  prefix: '',
  manifest: ''
}

function loadManifest () {
  if (manifest) {
    return manifest
  }
  try {
    return JSON.parse(fs.readFileSync(options.manifest, 'utf8'))
  } catch (err) {
    throw new Error('Manifest file can\'t not be loaded')
  }
}

function assetPath (source) {
  if (config.pro) {
    manifest = loadManifest()
    let filePath = '/' + manifest[source.replace(/^\//, '')]
    if (!filePath) {
      return source
    }
    if (options.prefix) {
      return urljoin(options.prefix, filePath)
    } else {
      return filePath
    }
  } else {
    return source
  }
}

module.exports = function (opt) {
  options = Object.assign(options, opt)

  return function (req, res, next) {
    res.locals.assetPath = assetPath
    next()
  }
}