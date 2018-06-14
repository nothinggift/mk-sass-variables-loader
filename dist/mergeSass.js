'use strict';

var sass = require('node-sass');
var fs = require('fs');
var path = require('path');

var importReg = /\@import\s+['"]([^'"]+)['"];/g;

var paths = {};

var normalize = function normalize(path) {
  return path.replace(/\\/g, '/');
};

var importer = function importer(url, prey) {
  var absolutePath = normalize(path.resolve(path.dirname(prey), url));
  if (!path.extname(absolutePath)) {
    absolutePath += '.scss';
  }
  if (paths[prey]) {
    paths[prey].push(absolutePath);
  } else {
    paths[prey] = [absolutePath];
  }
  return {
    file: absolutePath
  };
};

module.exports = function (file) {
  var output = sass.renderSync({
    file: file,
    importer: importer
  });
  var files = output.stats.includedFiles;
  files = Array.from(new Set(files));
  files.sort(function (a, b) {
    if (!paths[a]) {
      return -1;
    } else if (!paths[b]) {
      return 1;
    }
    var isAIncludeB = paths[a].indexOf(b) > -1;
    var isBIncludeA = paths[b].indexOf(a) > -1;
    if (isAIncludeB && !isBIncludeA) {
      return 1;
    } else if (isBIncludeA && !isAIncludeB) {
      return -1;
    } else {
      return 0;
    }
  });
  var sassString = '';
  for (var i in files) {
    var str = fs.readFileSync(files[i]).toString();
    sassString += str.replace(importReg, '');
  }
  return sassString;
};