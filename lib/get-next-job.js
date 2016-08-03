'use strict'

var fs = require('fs')
var miss = require('mississippi')
var config = require('../config')

var getNextJob = miss.through(function (chunck, encoding, callback) {
  var jobs = fs.readdirSync(config.ARCHIVE_JOB_DIRECTORY_PATH)
  var item

  console.log('get-next-job')

  if (jobs.length > 0) {
    console.log('File: ' + jobs[0])
    item = fs.readFileSync(config.ARCHIVE_JOB_DIRECTORY_PATH + '/' + jobs[0])
    return callback(null, item.toString())
  } else {
    console.log('No jobs in queue')
    process.exit(0)
  }
})

module.exports = getNextJob
