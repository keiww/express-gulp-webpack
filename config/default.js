const path = require('path')
const root = path.resolve(__dirname, '../')

module.exports = {
  pro: false,
  port: 3000,
  root: root,
  cdn: {
    prefix: '/',
    manifestPath: root,
    manifestFile: path.join(root, './rev-manifest.json'),
    dir: path.resolve(root, 'cdn')
  }
}