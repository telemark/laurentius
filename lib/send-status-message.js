'use strict'

var miss = require('mississippi')
var Wreck = require('wreck')
var generateToken = require('../lib/generate-token')
var config = require('../config')
var token = generateToken({key: config.JWT_KEY, payload: {system: 'laurentius'}})
var wreckOptions = {
  json: true,
  headers: {
    Authorization: token
  }
}

var sendStatusMessage = miss.through(function (chunck, encoding, callback) {
  var item = JSON.parse(chunck)

  if (item.CALLBACK_STATUS_URL) {
    console.log(item._id + ': send-status-message')
    wreckOptions.payload = JSON.stringify({status: config.CALLBACK_STATUS_MESSAGE})
    Wreck.post(item.CALLBACK_STATUS_URL, wreckOptions, function (error, response, payload) {
      if (error) {
        return callback(error, null)
      } else {
        return callback(null, JSON.stringify(item))
      }
    })
  } else {
    console.log(item._id + ': send-status-message No message to send')
    return callback(null, JSON.stringify(item))
  }
})

module.exports = sendStatusMessage
