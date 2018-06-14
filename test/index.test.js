var loadSassVariables = require('../src/loadSassVariables')
var path = require('path')
var expect = require('chai').expect;

var sassPath = path.resolve(__dirname, 'variables.scss')

context('test sass variables loader', function() {

  describe('load single sass file', function() {
    var sassPath = path.resolve(__dirname, 'color.scss')
    var json = loadSassVariables(sassPath)
    it('should return a object with 256 items', function() {
      expect(json).to.be.an('object')
      expect(Object.keys(json).length).to.be.equal(256);
    })
  })

  describe('load sass file with import variables from other sass file', function() {
    var sassPath = path.resolve(__dirname, 'variables.scss')
    var json = loadSassVariables(sassPath)
    it('should return a object with 10 items', function() {
      expect(json).to.be.an('object')
      expect(Object.keys(json).length).to.be.equal(10);
    })
  })

  describe('load normal sass file', function() {
    var sassPath = path.resolve(__dirname, 'style.scss')
    var json = loadSassVariables(sassPath)
    it('should return a object with 2 items', function() {
      expect(json).to.be.an('object')
      expect(Object.keys(json).length).to.be.equal(2);
    })
  })

  describe('load all import sass variables', function() {
    var sassPath = path.resolve(__dirname, 'style.scss')
    var json = loadSassVariables(sassPath, true)
    it('should return a object with 261 items', function() {
      expect(json).to.be.an('object')
      expect(Object.keys(json).length).to.be.equal(261);
    })
  })
})
