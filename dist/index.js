'use strict';

var loadSassVariables = require('./loadSassVariables');
var loaderUtils = require('loader-utils');

var loader = function loader(source, map) {
  var options = loaderUtils.getOptions(this);
  var includeAll = !!options.all;
  var vars = loadSassVariables(this.resourcePath, includeAll);
  return 'module.exports =' + JSON.stringify(vars) + ';';
};

module.exports = loader;