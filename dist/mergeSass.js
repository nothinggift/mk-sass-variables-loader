'use strict';

var sass = require('node-sass');
var path = require("path");
var fs = require('fs');

var importReg = /\@import\s+['"]([^'"]+)['"];/g;

module.exports = function (file) {
  var output = sass.renderSync({
    file: file
  });
  var files = output.stats.includedFiles;
  files.reverse();
  var sassString = '';
  for (var i in files) {
    var str = fs.readFileSync(files[i]).toString();
    sassString += str.replace(importReg, '');
  }
  return sassString;
};