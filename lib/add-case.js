'use strict'

var miss = require('mississippi')
var getMetadata = require('tfk-arkiv-metadatagenerator')
var p360 = require('p360')
var config = require('../config')

var addCase = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  console.log(item._id + ': add-case')

  // If elevmappe exist break
  if (item.caseNumber) {
    console.log(item._id + ': add-case: case exists: ' + item.caseNumber)
    return callback(null, JSON.stringify(item))
  }

  var addThisCase = {
    generator: 'skoleskyss-add-case',
    personalIdNumber: item.person.id,
    fullName: item.person.fullName,
    caseTitle: item.title
  }

  var options = getMetadata(addThisCase)
  options.p360 = config.p360

  // console.log(JSON.stringify(item, null, 2))
  // process.exit()

  p360(options, function (err, data) {
    if (err) {
      console.error(JSON.stringify(err))
      return callback(err)
    } else {
      item.caseNumber = data.CreateCaseResult.CaseNumber
      console.log(item._id + ': add-case: created case: ' + item.caseNumber)
      return callback(null, JSON.stringify(item))
    }
  })
})

module.exports = addCase
