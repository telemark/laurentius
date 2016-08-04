'use strict'

const fs = require('fs')
const miss = require('mississippi')
const config = require('../config')

function filterJobsList (jobs) {
  var list = []

  jobs.forEach(function (job) {
    if (job.indexOf('.json') > -1) {
      list.push(job)
    }
  })

  return list
}

module.exports = miss.through(function (chunck, encoding, callback) {
  var jobs = filterJobsList(fs.readdirSync(config.ARCHIVE_JOB_DIRECTORY_PATH))
  var item

  console.log('get-next-job')

  if (jobs.length > 0) {
    item = fs.readFileSync(config.ARCHIVE_JOB_DIRECTORY_PATH + '/' + jobs[0])
    return callback(null, item.toString())
  } else {
    console.log('No jobs in queue')
    process.exit(0)
  }
})
