var loadSassVariables = require('./loadSassVariables')
var loaderUtils = require('loader-utils')

const loader = function (source, map) {
  let options = loaderUtils.getOptions(this)
  let includeAll = options && !!options.all
  var vars = loadSassVariables(this.resourcePath, includeAll)
  return 'module.exports =' + JSON.stringify(vars) + ';'
}

module.exports = loader
