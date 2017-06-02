const fs = require('fs')
const path = require('path')
const sass = require('node-sass')

const mergeSass = require('./mergeSass')

const varReg = /\$([\w-]+)/g
//const importReg = /\@import\s+['"]([^'"]+)['"];/g
const cssReg = /load-sass-variables {(.+)}\s+$/

function match (reg, string, index) {
  if (!index) {
    index = 0
  }
  var matchs = []
  var match
  while ((match = reg.exec(string)) !== null) {
    if (matchs.indexOf(match[index]) === -1) {
      matchs.push(match[index])
    }
  }
  return matchs
}
module.exports = function (filePath, includeAll) {
  var variables = {}
  var sassString = includeAll ? mergeSass(filePath) : fs.readFileSync(filePath).toString()
  var matchs = match(varReg, sassString, 1)

  var variablesCss = matchs.map(variable => variable + ': $' + variable + ';')
    .join('')
  variablesCss = 'load-sass-variables{' + variablesCss + '}'

  sassString += variablesCss

  var imports = [path.dirname(filePath)]

  var result = sass.renderSync({
    data: sassString,
    includePaths: imports,
    outputStyle: 'compact'
  })
  var cssString = result.css.toString()
  var cssMatchs = cssString.match(cssReg)
  if (cssMatchs === null) {
    return {}
  }
  var cssArray = cssMatchs[1].split(';')
  cssArray.pop()
  cssArray.forEach(function (item) {
    var items = item.split(':')
    var name = items[0].replace(/^\s/, '')
    var value = items[1].replace(/^\s/, '')
    variables[name] = value
  })
  return variables
}
