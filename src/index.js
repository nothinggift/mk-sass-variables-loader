var loadSassVariables = require('./loadSassVariables')

const loader = function (source, map) {
  let options = loaderUtils.getOptions(this)
  let includeAll = !!options.all
  var vars = loadSassVariables(this.resourcePath, includeAll)
  return 'module.exports =' + JSON.stringify(vars) + ';'
}

module.exports = loader
