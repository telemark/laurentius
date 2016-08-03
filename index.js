'use strict'

function tfkLaurentius (item, callback) {
  var miss = require('mississippi')
  var streamifier = require('streamifier')
  var getNextJob = require('./lib/get-next-job')
  var prepareItem = require('./lib/prepareItem')
  var searchContact = require('./lib/search-contact')
  var addContact = require('./lib/add-private-person')
  var getCase = require('./lib/get-case')
  var openCase = require('./lib/open-case')
  var addCase = require('./lib/add-case')
  var addDocuments = require('./lib/add-documents')
//  var addSecret = require('./lib/add-secret')
//  var addNote = require('./lib/add-note')
  var updateCase = require('./lib/update-case')
  var saveJob = require('./lib/save-job-archive')
  var cleanUp = require('./lib/cleanup-job')
  var sendStatusMessage = require('./lib/send-status-message')
  var starter = streamifier.createReadStream(JSON.stringify(item))

  function finished (error, data) {
    if (error) {
      callback(error, null)
    }
  }

  miss.pipe(
    starter,
    getNextJob,
    prepareItem,
    searchContact,
    addContact,
    getCase,
    openCase,
    addCase,
    addDocuments,
//    addSecret,
//    addNote,
    updateCase,
    saveJob,
    cleanUp,
    sendStatusMessage,
    finished
  )
}

module.exports = tfkLaurentius
