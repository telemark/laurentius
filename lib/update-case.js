'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var updateCase = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': update-case')

  // If elevmappe exist break
  if (item.signOff === false) {
    console.log(item._id + ': update-case: no need to update case')
    return callback(null, JSON.stringify(item))
  }

  var updateThisCase = {
    generator: 'skoleskyss-update-case',
    caseNumber: item.caseNumber
  }

  var options = getMetadata(updateThisCase)
  options.p360 = config.p360

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      console.log(item._id + ': update-case: closed case: ' + item.caseNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = updateCase
