'use strict';

var loadSassVariables = require('./loadSassVariables');

var loader = function loader(source, map) {
  var vars = loadSassVariables(this.resourcePath);
  return 'module.exports =' + JSON.stringify(vars) + ';';
};

module.exports = loader;