var loadSassVariables = require('./loadSassVariables');

const loader = function (source, map) {
  var vars = loadSassVariables(this.resourcePath);
  return 'module.exports =' + JSON.stringify(vars);
};

export { loader as default, loadSassVariables };