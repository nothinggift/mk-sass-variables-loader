const sass = require('node-sass')
const fs = require('fs')
const path = require('path')

const importReg = /\@import\s+['"]([^'"]+)['"];/g

let paths = {}

const normalize = function (path) {
  return path.replace(/\\/g, '/')
}

const importer = function (url, prey) {
  let absolutePath = normalize(path.resolve(path.dirname(prey), url))
  if (!path.extname(absolutePath)) {
    absolutePath += '.scss'
  }
  if (paths[prey]) {
    paths[prey].push(absolutePath)
  } else {
    paths[prey] = [absolutePath]
  }
  return {
    file: absolutePath
  }
}

module.exports = function (file) {
  let output = sass.renderSync({
    file: file,
    importer: importer
  })
  let files = output.stats.includedFiles
  files = Array.from(new Set(files))
  files.sort((a, b) => {
    if (!paths[a]) {
      return -1
    } else if (!paths[b]) {
      return 1
    }
    let isAIncludeB = paths[a].indexOf(b) > -1
    let isBIncludeA = paths[b].indexOf(a) > -1
    if (isAIncludeB && !isBIncludeA) {
      return 1
    } else if (isBIncludeA && !isAIncludeB) {
      return -1
    } else {
      return 0
    }
  })
  let sassString = ''
  for (let i in files) {
    let str = fs.readFileSync(files[i]).toString()
    sassString += str.replace(importReg, '')
  }
  return sassString
}
