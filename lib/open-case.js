'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var openCase = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': open-case')

  if (!item.caseNumber) {
    console.log(item._id + ': open-case: case doesnt exist')
    return callback(null, JSON.stringify(item))
  }

  var openThisCase = {
    generator: 'skoleskyss-open-case',
    caseNumber: item.caseNumber
  }

  var options = getMetadata(openThisCase)
  options.p360 = config.p360

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': open-case: opened case: ' + item.caseNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = openCase
