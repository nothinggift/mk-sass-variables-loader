var loadSassVariables = require('../src/loadSassVariables')
var path = require('path')
var expect = require('chai').expect;

context('test sass variables loader', function() {

  describe('load single sass file', function() {
    var sassPath = path.resolve(__dirname, 'color.scss')
    var colorJson = loadSassVariables(sassPath)
    it('should return a object with 256 items', function() {
      expect(colorJson).to.be.an('object')
      expect(Object.keys(colorJson).length).to.be.equal(256);
    })
  })

  describe('load sass file with import variables from other sass file', function() {
    var sassPath = path.resolve(__dirname, 'variables.scss')
    var colorJson = loadSassVariables(sassPath)
    it('should return a object with 10 items', function() {
      expect(colorJson).to.be.an('object')
      expect(Object.keys(colorJson).length).to.be.equal(10);
    })
  })

  describe('load normal sass file', function() {
    var sassPath = path.resolve(__dirname, 'style.scss')
    var colorJson = loadSassVariables(sassPath)
    it('should return a object with 2 items', function() {
      expect(colorJson).to.be.an('object')
      expect(Object.keys(colorJson).length).to.be.equal(2);
    })
  })
})
