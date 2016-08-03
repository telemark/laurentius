'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var cleanItem = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)
  var fileName = config.ARCHIVE_JOB_DIRECTORY_PATH + '/' + item._id + '.json'

  console.log(item._id + ': cleanup-job')

  fs.unlinkSync(fileName)

  return callback(null, JSON.stringify(item))
})

module.exports = cleanItem
