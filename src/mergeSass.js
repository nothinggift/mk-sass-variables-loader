const sass = require('node-sass')
const fs = require('fs')

const importReg = /\@import\s+['"]([^'"]+)['"];/g

module.exports = function (file) {
  let output = sass.renderSync({
    file: file
  })
  let files = output.stats.includedFiles
  // 调整排序
  files.push(files.shift())
  let sassString = ''
  for (let i in files) {
    let str = fs.readFileSync(files[i]).toString()
    sassString += str.replace(importReg, '')
  }
  return sassString
}
